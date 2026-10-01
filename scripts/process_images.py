from pathlib import Path
from PIL import Image, ImageOps


ROOT = Path("/Users/data/Pictures/Portfolio/urbanarts-launch")
COMPLETED = Path("/Users/data/Pictures/Sites Project Photos/Completed Site Photos")
RENDERS = Path("/Users/data/Pictures/Sites Project Photos/3D Renders")
PRINT = Path("/Users/data/Pictures/Portfolio/Print Portfolio Images")
OLD_SITE = Path("/Users/data/Scripts/urbanarts.co.in/urbanarts.github.io/img/assets")

IMAGES = {
    "ravi-01": COMPLETED / "Dr Ravi - Site Photos/Images/DSC00562.jpg",
    "ravi-02": COMPLETED / "Dr Ravi - Site Photos/Images/DSC00588.jpg",
    "ravi-03": COMPLETED / "Dr Ravi - Site Photos/Images/DSC00594.jpg",
    "ravi-04": COMPLETED / "Dr Ravi - Site Photos/Images/DSC00507.jpg",
    "ravi-05": COMPLETED / "Dr Ravi - Site Photos/Images/DSC00449.jpg",
    "ravi-06": COMPLETED / "Dr Ravi - Site Photos/Images/DSC00545.jpg",
    "thyagraj-01": COMPLETED / "Vanaja Thyagraj Completed Site Photos/Photos/DSC09961.jpg",
    "thyagraj-02": COMPLETED / "Vanaja Thyagraj Completed Site Photos/Photos/DSC00007.jpg",
    "thyagraj-03": COMPLETED / "Vanaja Thyagraj Completed Site Photos/Photos/DSC00033.jpg",
    "thyagraj-04": COMPLETED / "Vanaja Thyagraj Completed Site Photos/Photos/DSC09780.jpg",
    "thyagraj-05": COMPLETED / "Vanaja Thyagraj Completed Site Photos/Photos/DSC09873.jpg",
    "thyagraj-06": COMPLETED / "Vanaja Thyagraj Completed Site Photos/Photos/DSC09945.jpg",
    "smit-01": COMPLETED / "Client- Smit Begumpet/Dr-Smit-Interiors_14.jpeg",
    "smit-02": COMPLETED / "Client- Smit Begumpet/Dr-Smit-Interiors_6.jpeg",
    "smit-03": COMPLETED / "Client- Smit Begumpet/Dr-Smit-Interiors_11.jpeg",
    "smit-04": COMPLETED / "Client- Smit Begumpet/Dr-Smit-Interiors_22.jpeg",
    "smit-05": COMPLETED / "Client- Smit Begumpet/Dr-Smit-Interiors_23.jpeg",
    "smit-06": COMPLETED / "Client- Smit Begumpet/Dr-Smit-Interiors_19.jpeg",
    "lalitha-01": PRINT / "lalitha-bedroom-1.png",
    "lalitha-02": PRINT / "lalitha-kitchen-dining.png",
    "lalitha-03": PRINT / "lalitha-kitchen-4.png",
    "lalitha-04": PRINT / "lalitha-landscape-3.png",
    "lalitha-05": PRINT / "lalitha-landscape-5.png",
    "lalitha-06": PRINT / "lalitha-landscape-1.png",
    "amara-01": COMPLETED / "Model Flats - Amara Deevyashakti/Amara_Model-Flats_15.jpg",
    "amara-02": COMPLETED / "Model Flats - Amara Deevyashakti/Amara_Model-Flats_24.jpg",
    "amara-03": COMPLETED / "Model Flats - Amara Deevyashakti/Amara_Model-Flats_10.jpg",
    "amara-04": COMPLETED / "Model Flats - Amara Deevyashakti/Amara_Model-Flats_28.jpg",
    "amara-05": COMPLETED / "Model Flats - Amara Deevyashakti/Amara_Model-Flats_1.jpg",
    "amara-render": RENDERS / "Amara_Deevyashakti Realty Model Flats/East Facing renders/LIVING N DINNING_VIEW03 (5).png",
    "kachiguda-01": PRINT / "Kachiguda Railway Station 1.png",
    "kachiguda-02": PRINT / "Kachiguda Railway Station 2.png",
    "museum-01": PRINT / "archeology-museum-hyderabad-1.png",
    "museum-02": PRINT / "archeology-museum-hyderabad-2.png",
    "pvnr-01": PRINT / "PVNR Expressway 1.png",
    "pvnr-02": PRINT / "PVNR Expressway 2.jpg",
    "pvnr-03": PRINT / "PVNR Expressway 3.jpg",
    "pvnr-04": PRINT / "PVNR Expressway 4.jpg",
    "shanti-model": PRINT / "shanti-sarovar-model-1.png",
    "shanti-01": PRINT / "shanti-sarovar-1.png",
    "shanti-02": PRINT / "shanti-sarovar-2.png",
    "shanti-boulders": OLD_SITE / "sectorInstitutional/shanti-sarovar/shanti-sarovar-boulders-1920x1080.jpg",
    "shanti-campus": OLD_SITE / "sectorInstitutional/shanti-sarovar/shanti-sarovar-conference-block-phase1-1920x1080_1.jpg",
    "shanti-lake": OLD_SITE / "sectorInstitutional/shanti-sarovar/shanti-sarovar-2nd-lake_1.jpg",
    "shanti-sketch": OLD_SITE / "sectorInstitutional/shanti-sarovar/shanti-sarovar-sketch-meditation-cave_1920x1080.jpg",
    "shanti-quarry-before": OLD_SITE / "sectorInstitutional/shanti-sarovar/shanti-sarovar-quarry-land-prior-to-landscaping.jpg",
    "shanti-landscape-phase1-4": OLD_SITE / "sectorInstitutional/shanti-sarovar/shanti-sarovar-landscaping-phase1_4.jpg",
    "shanti-lake-auditorium": OLD_SITE / "sectorInstitutional/shanti-sarovar/shanti-sarovar-lake-auditorium-behind.jpg",
    "shanti-quarry-landscape": OLD_SITE / "sectorInstitutional/shanti-sarovar/shanti-sarovar-quarry-landscaping-in-progress.jpg",
    "shanti-landscape-works": OLD_SITE / "sectorInstitutional/shanti-sarovar/shanti-sarovar-landscape-site-works-in-progress.jpg",
    "shanti-sketch-auditorium": OLD_SITE / "sectorInstitutional/shanti-sarovar/shanti-sarovar-sketch-auditorium-wall_1024x683.jpg",
    "shanti-sketch-reception": OLD_SITE / "sectorInstitutional/shanti-sarovar/shanti-sarovar-sketch-reception-block_1024x683.jpg",
    "shanti-conference-front": OLD_SITE / "sectorInstitutional/shanti-sarovar/shanti-sarovar-conference-block-front_1000x1350.jpg",
    "shanti-conference-court": OLD_SITE / "sectorInstitutional/shanti-sarovar/shanti-sarovar-conference-block-courtyard_1000x1350.jpg",
    "shanti-plan-reception": OLD_SITE / "sectorInstitutional/shanti-sarovar/shanti-sarovar-dwg-reception_1000x1000.png",
    "shanti-plan-gallery": OLD_SITE / "sectorInstitutional/shanti-sarovar/shanti-sarovar-dwg-art-gallery_1000x1000.png",
    "shanti-auditorium-construction": OLD_SITE / "sectorInstitutional/shanti-sarovar/shanti-sarovar-auditorium-construction-in-progress.jpg",
    "shanti-conference-construction": OLD_SITE / "sectorInstitutional/shanti-sarovar/shanti-sarovar-conference-block-underconstruction.jpg",
    "shanti-landscape-phase1-3": OLD_SITE / "sectorInstitutional/shanti-sarovar/shanti-sarovar-landscaping-phase1_3.jpg",
    "harshal-profile": OLD_SITE / "sectionTeam/harshal-shinde-architect-hyderabad_1920x1080.jpg",
    "practice-model": PRINT / "guwahati-convention-center-model.png",
}


def save_webp(source: Path, target: Path, max_width: int, quality: int) -> None:
    if not source.exists():
        raise FileNotFoundError(source)
    with Image.open(source) as image:
        image = ImageOps.exif_transpose(image).convert("RGB")
        if image.width > max_width:
            height = round(image.height * max_width / image.width)
            image = image.resize((max_width, height), Image.Resampling.LANCZOS)
        target.parent.mkdir(parents=True, exist_ok=True)
        image.save(target, "WEBP", quality=quality, method=6)


out = ROOT / "public/images"
for name, source in IMAGES.items():
    save_webp(source, out / f"{name}.webp", 1800, 84)
    save_webp(source, out / f"{name}-small.webp", 900, 80)
    print(name)
