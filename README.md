# GitHubAnalyzer
Analyze someone's GitHub Activities

## Usage
```javascript
const analyzer = new GitHubAnalyzer();
const userName = "YUUKIToriyama";
analyzer.evaluateLanguageFrequencyOfTheUser(userName).then(result => {
	console.log(result);
});
```