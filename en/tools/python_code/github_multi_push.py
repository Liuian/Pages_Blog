import subprocess

# Define a list of repositories, their paths, and commit messages
repos = [
    {"name": "working_journal", "path": r"C:/Users/ianliu/Documents/working_journal", "message": "Update working journal"},
    {"name": "private note", "path": r"C:/Users/ianliu/Documents/Ian_private/notes_private", "message": "Update private note"},
]

def run_git_command(command, repo_name, repo_path):
    try:
        subprocess.run(command, cwd=repo_path, check=True, shell=True)
    except subprocess.CalledProcessError as e:
        print(f"Failed for {repo_name} with error: {e}")

def process_repo(repo):
    repo_name = repo["name"]
    repo_path = repo["path"]
    commit_message = repo["message"]

    print(f"\n\nProcessing repository: {repo_name}")

    # Step 1: git add .
    print("Staging changes...")
    run_git_command(["git", "add", "."], repo_name, repo_path)

    # Step 2: git commit -m "[message]"
    print("Committing changes...")
    run_git_command(["git", "commit", "-m", commit_message], repo_name, repo_path)

    # Step 3: git push
    print("Pushing changes...")
    run_git_command(["git", "push"], repo_name, repo_path)

    print(f"Successfully processed {repo_name}!")

def main():
    for repo in repos:
        process_repo(repo)

if __name__ == "__main__":
    main()