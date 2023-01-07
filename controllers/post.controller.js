const PostService = require('../services/post.service');
const SECRET_SUM = parseInt(process.env.SECRET_SUM);

class PostController {
  postService = new PostService();

  //일기장 생성
  createPost = async (req, res) => {
    try {
      const userId = res.locals.userId - SECRET_SUM; //로그인 미들웨어를 어떻게 사용하느냐의 차이
      const { diaryId } = req.params;
      // console.log(diaryId);
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
    } catch (error) {
      // console.log(error);
      return res.status(400).json({ errorMessage: '일기장 생성 실패' });
    }
  };

  //일기장 전체 조회
  findPost = async (req, res) => {
    try {
      const { diaryId } = req.params;
      const post = await this.postService.findPost(diaryId);
      return res.status(200).json({ data: post, result: true });
    } catch (error) {
      console.log(error);
      res.status(400).json({ errorMessage: '일기장 전체 조회 실패' });
    }
  };

  // //일기장 상세 조회
  // findDetailPost = async (req, res) => {
  //   try {
  //     const userId = res.locals.userId - SECRET_SUM;
  //     const post = await this.postService.findDetailPost(userId, diaryId);
  //     return res.status(200).json({ data: post, result: true });
  //   } catch (error) {
  //     console.log(error);
  //     res.status(400).json({ errorMessage: '일기장 상세 조회 실패' });
  //   }
  // };

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
    } catch (error) {
      console.log(error);
      res.status(400).json({ errorMessage: '일기장 수정 실패' });
    }
  };

  //일기장 삭제
  deletePost = async (req, res) => {
    try {
      const userId = res.locals.userId - SECRET_SUM;
      const { postId } = req.params;
      console.log(postId);
      await this.postService.deletePost(userId, postId);
      // console.log(postId);
      return res
        .status(201)
        .json({ message: '일기장 삭제 성공', result: true });
    } catch (error) {
      console.log(error);
      res.status(400).json({ errorMessage: '일기장 삭제 실패' });
    }
  };
}

module.exports = PostController;
