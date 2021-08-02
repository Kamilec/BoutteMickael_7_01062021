const express = require('express');
const router = express.Router();
const commentCtrl = require('../controllers/comments');
const auth = require('../middleware/auth');

router.get('/', commentCtrl.findAllComments);
router.get('/:Postid', commentCtrl.findOneComment);
router.post('/', auth, commentCtrl.createComment);
router.delete('/', auth, commentCtrl.deleteComment);
router.post('/:commentid', auth, commentCtrl.modifyComment);
router.post('/', auth, commentCtrl.likeDislikeComment);

module.exports = router;
