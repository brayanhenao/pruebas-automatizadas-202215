import compareImages from 'resemblejs/compareImages';
import {ComparisonOptions, ComparisonResult} from 'resemblejs';
import * as fs from 'fs';

interface FeatureInfo {
	feature: string;
	scenarios: string[];
}

interface ScenarioImageResult {
	scenario: string;
	image: string;
	results: ComparisonResult;
}

interface FeatureImagesResult {
	feature: string;
	scenarios: ScenarioImageResult[];
}

function compareImagesAsync(
	image1: string | ImageData | Buffer,
	image2: string | ImageData | Buffer,
	options: ComparisonOptions,
): Promise<ComparisonResult> {
	return new Promise((resolve, reject) => {
		compareImages(image1, image2, options)
			.then((data: ComparisonResult) => {
				resolve(data);
			})
			.catch((err: Error) => {
				reject(err);
			});
	});
}

function generateReport(featureImagesResults: FeatureImagesResult[]): void {
	// HTML report
	fs.writeFileSync(`./report.html`, createReport(featureImagesResults));
	fs.copyFileSync('./index.css', `./index.css`);


}

function createReport(featureImagesResults: FeatureImagesResult[]): string {
	const datetime = new Date();
	return `
	<html>
		<head>
			<title> Regresion Test Report </title>
			<link href='index.css' type='text/css' rel='stylesheet'>
			<link href='https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css' rel='stylesheet' integrity='sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi' crossorigin='anonymous'>
		</head>
		<body>
			<section>
			<div class='container-fluid px-3'>
			<h2>Report for
				 <a href='http://localhost:2368'> Ghost</a>
			</h2>
			<p>Executed: ${datetime.toISOString()}</p>
			${featureImagesResults.map((FeatureImagesResult) => featureHtml(FeatureImagesResult))}
			</div>
			</section>
			
			<script src='https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.6/dist/umd/popper.min.js' integrity='sha384-oBqDVmMz9ATKxIep9tiCxS/Z9fNfEXiDAYTujMAeBAsjFuCZSmKbSSUnQlmh/jp3' crossorigin='anonymous'></script>
			<script src='https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.min.js' integrity='sha384-IDwe1+LCz02ROU9k972gdyvl+AESN10+x7tBKgc9I5HFtuNz0wWnPclzo6p9vxnk' crossorigin='anonymous'></script>
		</body>
	</html>`;
}

function featureHtml(featureImage: FeatureImagesResult) {
	return `<h3>
					${featureImage.feature}
					</h3>
					${featureImage.scenarios.map((scenary) => scenaryHtml(scenary, featureImage.feature))}
					<hr/>
	`;
}

function scenaryHtml(scenary: ScenarioImageResult, feature: string) {
	return `
			<h4>Scenary: ${scenary.scenario}</h4>
			<p>Mismatch Percentage: ${scenary.results.misMatchPercentage} | same dimension: ${scenary.results.isSameDimensions} | Analysis time: ${scenary.results.analysisTime}</p>
			<div class='row my-2'>
				<div class='col'>
					<figure>
						<img src='./images/actual/${feature}/${scenary.image}' />
						<figcaption>Ghost version: <b>5.22.9</b></figcaption>
					</figure>
					
				</div>
				<div class='col'>
				<figure>
						<img src='./images/new/${feature}/${scenary.image}' />
						<figcaption>Ghost version: <b>3.42.9</b></figcaption>
					</figure>
				</div>
				<div class='col'>
				<figure>
					<img src='./images/diff/${feature}/${scenary.image}' />
					<figcaption>Diff</figcaption>
				</figure>
					
				</div>
			</div>
			`;

}

async function generateDiffImages(
	actualGhostImagesPath: string,
	newGhostImagesPath: string,
	diffImagesPath: string,
	features: FeatureInfo[],
	options: ComparisonOptions,
): Promise<FeatureImagesResult[]> {
	let featureImagesResults: FeatureImagesResult[];
	featureImagesResults = [];

	for (const feature of features) {
		// Check if feature diff folder exists
		const featureDiffPath = `${diffImagesPath}/${feature.feature}`;
		if (!fs.existsSync(featureDiffPath)) {
			fs.mkdirSync(featureDiffPath);
		}

		const featureImagesResult: FeatureImagesResult = {
			feature: feature.feature,
			scenarios: [],
		};

		for (const scenario of feature.scenarios) {
			// All files with the format SCENARIO_NUMBER.png
			const actualGhostScenarioImages = fs
				.readdirSync(`${actualGhostImagesPath}/${feature.feature}`)
				.filter((file) => file.startsWith(scenario));
			const newGhostScenarioImages = fs
				.readdirSync(`${newGhostImagesPath}/${feature.feature}`)
				.filter((file) => file.startsWith(scenario));

			for (const actualGhostScenarioImage of actualGhostScenarioImages) {
				const actualGhostScenarioImagePath = `${actualGhostImagesPath}/${feature.feature}/${actualGhostScenarioImage}`;
				const newGhostScenarioImagePath = `${newGhostImagesPath}/${feature.feature}/${actualGhostScenarioImage}`;

				if (newGhostScenarioImages.includes(actualGhostScenarioImage)) {
					const diffGhostScenarioImagePath = `${featureDiffPath}/${actualGhostScenarioImage}`;

					const results = await compareImagesAsync(
						actualGhostScenarioImagePath,
						newGhostScenarioImagePath,
						options,
					);

					// @ts-ignore
					fs.writeFileSync(diffGhostScenarioImagePath, results.getBuffer());

					featureImagesResult.scenarios.push({
						scenario: scenario,
						image: actualGhostScenarioImage,
						results: results,
					});
				}
			}
		}
		featureImagesResults.push(featureImagesResult);
	}

	return featureImagesResults;
}

async function Runner() {
	const IMAGES_ACTUAL_GHOST = './images/actual';
	const IMAGES_OLD_GHOST = './images/new';
	const IMAGES_DIFF_GHOST = './images/diff';

	// Clear diff images content
	if (fs.existsSync(IMAGES_DIFF_GHOST)) {
		fs.rmdirSync(IMAGES_DIFF_GHOST, {recursive: true});
		fs.mkdirSync(IMAGES_DIFF_GHOST);
	}

	const FEATURES: FeatureInfo[] = [
		{
			feature: 'F1',
			scenarios: ['SC1', 'SC3'],
		},
		{
			feature: 'F2',
			scenarios: ['SC2'],
		},
		{
			feature: 'F3',
			scenarios: ['SC2'],
		},
		{
			feature: 'F4',
			scenarios: ['SC1'],
		},
		{
			feature: 'F5',
			scenarios: ['SC1', 'SC2'],
		},
		{
			feature: 'F6',
			scenarios: ['SC1'],
		},
		{
			feature: 'F8',
			scenarios: ['SC1', 'SC2'],
		},
	];

	const options: ComparisonOptions = {
		output: {
			errorColor: {
				red: 255,
				green: 0,
				blue: 255,
			},
			errorType: 'movement',
			transparency: 0.3,
			largeImageThreshold: 1200,
			useCrossOrigin: false,
		},
		scaleToSameSize: true,
		ignore: 'antialiasing',
	};

	const featureImagesResults = await generateDiffImages(
		IMAGES_ACTUAL_GHOST,
		IMAGES_OLD_GHOST,
		IMAGES_DIFF_GHOST,
		FEATURES,
		options,
	);

	generateReport(featureImagesResults);
}

Runner();
