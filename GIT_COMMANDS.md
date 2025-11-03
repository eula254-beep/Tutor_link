# Git Commands for Deployment

## Step 1: Check Status
# See what files have changed
git status

## Step 2: Add All Changes
# Add all modified and new files
git add .

## Step 3: Commit Changes
# Commit with a descriptive message
git commit -m "Configure project for Render and Vercel deployment

- Add render.yaml for backend deployment
- Add vercel.json for frontend SPA routing
- Update all API calls to use environment variables
- Configure CORS for production
- Add comprehensive deployment documentation
- Create environment variable templates"

## Step 4: Push to GitHub
# Push to your main branch
git push origin main

## Step 5: Verify on GitHub
# Open your repository on GitHub and verify all files are there
# URL: https://github.com/eula254-beep/Tutor_link

## Alternative: If you haven't set up the remote yet
# Set up remote repository
git remote add origin https://github.com/eula254-beep/Tutor_link.git

# Push to main branch
git push -u origin main

## Troubleshooting

# If you need to pull changes first
git pull origin main --rebase

# If you have conflicts, resolve them and then:
git add .
git rebase --continue
git push origin main

# If you want to see what will be committed
git diff --staged

# If you want to unstage a file
git reset HEAD <filename>

# If you want to discard changes to a file
git checkout -- <filename>
