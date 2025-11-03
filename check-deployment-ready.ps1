# Deployment Verification Script
# Run this to check if your project is ready for deployment

Write-Host "======================================" -ForegroundColor Cyan
Write-Host "TutorLink Deployment Readiness Check" -ForegroundColor Cyan
Write-Host "======================================" -ForegroundColor Cyan
Write-Host ""

$issues = @()
$warnings = @()

# Check if we're in the right directory
if (-not (Test-Path ".\backend") -or -not (Test-Path ".\frontend")) {
    Write-Host "Error: Run this script from the Tutor_link root directory" -ForegroundColor Red
    exit 1
}

Write-Host "Checking project structure..." -ForegroundColor Yellow

# Check configuration files
$configFiles = @(
    "render.yaml",
    "frontend\vercel.json",
    "frontend\.env.example",
    "backend\.env.example",
    "DEPLOYMENT.md",
    "README.md"
)

foreach ($file in $configFiles) {
    if (Test-Path $file) {
        Write-Host "  [OK] $file" -ForegroundColor Green
    } else {
        Write-Host "  [MISSING] $file" -ForegroundColor Red
        $issues += "$file is missing"
    }
}

Write-Host ""
Write-Host "Checking environment setup..." -ForegroundColor Yellow

# Check backend .env
if (Test-Path "backend\.env") {
    Write-Host "  [OK] backend\.env exists" -ForegroundColor Green
    Write-Host "  Info: Make sure it contains all required variables" -ForegroundColor Cyan
} else {
    Write-Host "  [WARN] backend\.env not found" -ForegroundColor Yellow
    $warnings += "Create backend\.env from backend\.env.example for local development"
}

# Check frontend .env
if (Test-Path "frontend\.env") {
    Write-Host "  [OK] frontend\.env exists" -ForegroundColor Green
} else {
    Write-Host "  [WARN] frontend\.env not found" -ForegroundColor Yellow
    $warnings += "Create frontend\.env from frontend\.env.example for local development"
}

Write-Host ""
Write-Host "Checking dependencies..." -ForegroundColor Yellow

# Check backend node_modules
if (Test-Path "backend\node_modules") {
    Write-Host "  [OK] Backend dependencies installed" -ForegroundColor Green
} else {
    Write-Host "  [WARN] Backend dependencies not installed" -ForegroundColor Yellow
    $warnings += "Run 'npm install' in backend directory"
}

# Check frontend node_modules
if (Test-Path "frontend\node_modules") {
    Write-Host "  [OK] Frontend dependencies installed" -ForegroundColor Green
} else {
    Write-Host "  [WARN] Frontend dependencies not installed" -ForegroundColor Yellow
    $warnings += "Run 'npm install' in frontend directory"
}

Write-Host ""
Write-Host "Checking .gitignore..." -ForegroundColor Yellow

if (Test-Path ".gitignore") {
    $gitignoreContent = Get-Content ".gitignore" -Raw
    if ($gitignoreContent -match "\.env") {
        Write-Host "  [OK] .env files are gitignored" -ForegroundColor Green
    } else {
        Write-Host "  [ERROR] .env files not properly gitignored" -ForegroundColor Red
        $issues += ".env files should be in .gitignore"
    }
} else {
    Write-Host "  [ERROR] .gitignore missing" -ForegroundColor Red
    $issues += ".gitignore file is missing"
}

Write-Host ""
Write-Host "======================================" -ForegroundColor Cyan
Write-Host "Summary" -ForegroundColor Cyan
Write-Host "======================================" -ForegroundColor Cyan
Write-Host ""

if ($issues.Count -eq 0 -and $warnings.Count -eq 0) {
    Write-Host "All checks passed! Your project is ready for deployment." -ForegroundColor Green
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor Cyan
    Write-Host "1. Commit and push your changes to GitHub" -ForegroundColor White
    Write-Host "2. Follow the deployment guide in DEPLOYMENT.md" -ForegroundColor White
    Write-Host "3. Deploy backend to Render first" -ForegroundColor White
    Write-Host "4. Then deploy frontend to Vercel" -ForegroundColor White
} else {
    if ($issues.Count -gt 0) {
        Write-Host "Issues found that need to be fixed:" -ForegroundColor Red
        foreach ($issue in $issues) {
            Write-Host "  - $issue" -ForegroundColor Red
        }
        Write-Host ""
    }
    
    if ($warnings.Count -gt 0) {
        Write-Host "Warnings (recommended but not required):" -ForegroundColor Yellow
        foreach ($warning in $warnings) {
            Write-Host "  - $warning" -ForegroundColor Yellow
        }
        Write-Host ""
    }
    
    if ($issues.Count -gt 0) {
        Write-Host "Please fix the issues above before deploying." -ForegroundColor Red
    } else {
        Write-Host "You can proceed with deployment, but address warnings for best results." -ForegroundColor Yellow
    }
}

Write-Host ""
Write-Host "Documentation:" -ForegroundColor Cyan
Write-Host "  - DEPLOYMENT.md - Complete deployment guide" -ForegroundColor White
Write-Host "  - DEPLOYMENT_QUICK_REFERENCE.md - Quick reference" -ForegroundColor White
Write-Host "  - DEPLOYMENT_SUMMARY.md - Summary of changes" -ForegroundColor White
Write-Host ""
