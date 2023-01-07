const PostService = require('../services/post.service');
const SECRET_SUM = parseInt(process.env.SECRET_SUM);

class PostController {
  postService = new PostService();

  //일기장 생성
  createPost = async (req, res) => {
    try {
      const userId = res.locals.userId - SECRET_SUM;
      const { diaryId } = req.params;
      const { title, content, weather, tag } = req.body;
      const image = req.file.location;

      await this.postService.createPost(
        userId,
        diaryId,
        title,
        image,
        content,
        weather,
        tag,
      );

      return res
        .status(201)
        .json({ message: '일기장 생성 성공', result: true });
    } catch (err) {
      logger.error(err.message || err);
      return res.status(err.status || 500).json({
        result: false,
        message: err.message || '일기장 생성에 실패하였습니다.',
      });
    }
  };

  //일기장 전체 조회
  findPost = async (req, res) => {
    try {
      const { diaryId } = req.params;
      const userId = res.locals.userId - SECRET_SUM;
      const post = await this.postService.findPost(diaryId, userId);

      return res.status(200).json({ data: post, result: true });
    } catch (err) {
      logger.error(err.message || err);
      return res.status(err.status || 500).json({
        result: false,
        message: err.message || '일기장 조회에 실패하였습니다.',
      });
    }
  };

  //일기장 상세 조회
  findDetailPost = async (req, res) => {
    try {
      const userId = res.locals.userId - SECRET_SUM;
      const { postId } = req.params;
      const post = await this.postService.findDetailPost(postId, userId);

      return res.status(200).json({ data: post, result: true });
    } catch (error) {
      console.log(error);
      res.status(400).json({ errorMessage: '일기장 상세 조회 실패' });
    }
  };

  //일기장 수정
  patchPost = async (req, res) => {
    try {
      const userId = res.locals.userId - SECRET_SUM;
      const { postId } = req.params;
      const { title, content, weather, tag } = req.body;
      const image = req.file.location;

      await this.postService.patchPost(
        userId,
        postId,
        title,
        image,
        content,
        weather,
        tag,
      );

      return res
        .status(201)
        .json({ message: '일기장 수정 성공', result: true });
    } catch (err) {
      logger.error(err.message || err);
      return res.status(err.status || 500).json({
        result: false,
        message: err.message || '일기장 수정에 실패하였습니다.',
      });
    }
  };

  //일기장 삭제
  deletePost = async (req, res) => {
    try {
      const userId = res.locals.userId - SECRET_SUM;
      const { postId } = req.params;

      await this.postService.deletePost(userId, postId);

      return res
        .status(201)
        .json({ message: '일기장 삭제 성공', result: true });
    } catch (err) {
      logger.error(err.message || err);
      return res.status(err.status || 500).json({
        result: false,
        message: err.message || '일기장 삭제에 실패하였습니다.',
      });
    }
  };
}

module.exports = PostController;
