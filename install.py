import launch

if not launch.is_installed("nos-python3-sdk"):
    launch.run_pip("install nos-python3-sdk", "requirement for nos-images-browser")
