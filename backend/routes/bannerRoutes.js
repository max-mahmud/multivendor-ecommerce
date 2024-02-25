const router = require("express").Router();
const bannerController = require("../controllers/bannerController");
const { authMiddleware } = require("../middlewares/authMiddleware");

router.post("/add/banner", authMiddleware, bannerController.banner_add);
router.get("/get/banner/:productId", authMiddleware, bannerController.get_banner);
router.put("/update/banner/:bannerId", authMiddleware, bannerController.update_banner);
router.get("/banners", bannerController.all_banner);

module.exports = router;