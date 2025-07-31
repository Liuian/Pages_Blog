# pyenv for mac
- Set a requirements.txt to record packages: `pip freeze > requirements.txt`

- Setup new pyenv environment: `pyenv virtualenv {python_version} {env_name}` 
- Set a local python version: `pyenv local {env_name}`
- Unset that local version: `rm .python-version`

- Activate environment: `pyenv activate {env_name}`
- Deactivate env: `pyenv deactivate`

- List all pyenv environments: `pyenv versions`
- List all packages in envs: `pip list`
