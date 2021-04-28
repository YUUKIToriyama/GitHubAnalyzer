const { Octokit } = require("@octokit/core");
const settings = require("./settings");

class GitHubAnalyzer {
	constructor(_settings) {
		this.settings = _settings || settings
		this.octokit = new Octokit(this.settings)
	}

	getAllReposOfTheUser = (userName) => {
		return this.octokit.request("GET /users/{username}/repos", {
			username: userName,
			sort: "updated",
			per_page: 100,
		}).then(response => {
			return response.data.map(repository => repository.name);
		}).catch(error => {
			console.log(error);
		})
	}

	getLanguagesUsedInTheRepo = (userName, repositoryName) => {
		return this.octokit.request("GET /repos/{owner}/{repo}/languages", {
			owner: userName,
			repo: repositoryName
		}).then(response => {
			return response.data;
		})
	}

	evaluateLanguageFrequencyOfTheUser = (userName) => {
		return this.getAllReposOfTheUser(userName).then(async repositoryNames => {
			const frequencyOfLanguages = {};
			for (let repositoryName of repositoryNames) {
				await this.getLanguagesUsedInTheRepo(userName, repositoryName).then(frequency => {
					Object.keys(frequency).forEach(language => {
						if (!frequencyOfLanguages.hasOwnProperty(language)) {
							frequencyOfLanguages[language] = 0;
						}
						frequencyOfLanguages[language] = + frequency[language];
					});
				});
			}
			return frequencyOfLanguages;
		})
	}
};
module.exports = GitHubAnalyzer;