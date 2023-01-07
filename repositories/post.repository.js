const { Users, Diaries, Posts, Bookmark_post, Comments } = require('../models');
const { Sequelize } = require('sequelize');
class PostRepository {
  constructor(PostModel) {
    this.postModel = PostModel;
  }

  //일기장 생성
  createPost = async (userId, diaryId, title, image, content, weather, tag) => {
    // console.log(weather);
    await Posts.create({
      userId,
      diaryId,
      title,
      image,
      content,
      weather,
      tag,
    });
  };

  //일기장 전체 조회
  findPost = async (diaryId) => {
    const post = await Posts.findAll({
      where: {
        diaryId,
      },
      attributes: [
        'postId',
        [Sequelize.col('User.nickname'), 'nickname'], //db생성시에 뭔가 잘못된 것 같음
        [Sequelize.col('Diary.insideColor'), 'insideColor'],
        'title',
        'image',
        'tag',
        [
          Sequelize.fn('COUNT', Sequelize.col('Comments.comment')),
          'commentCount',
        ],
        // [
        //   Sequelize.fn('COUNT', Sequelize.col('Comments.comment')),
        //   'commentCount',
        // ],
        'createdAt',
      ],
      include: [
        {
          model: Comments,
          attributes: [],
        },
        {
          model: Bookmark_post,
          attributes: [],
        },
        {
          model: Diaries,
          attributes: [],
        },
        {
          model: Users,
          attributes: [],
        },
      ],
      group: 'postId',
    });
    return post;
  };

  // //일기장 상세 조회
  // findDetailPost = async (postId) => {
  //   const post = await Posts.findOne({
  //     where: {
  //       postId: postId,
  //     },
  //     attributes: [''],
  //     include: [
  //       {
  //         model: comment,
  //         attributes: ['comment', 'count'],
  //       },
  //       {
  //         model: bookmark,
  //         attributes: [true, false],
  //       },
  //     ],
  //   });
  //   return post;
  // };

  //일기장 수정
  patchPost = async (userId, postId, title, image, content, weather, tag) => {
    const post = await Posts.update(
      {
        userId,
        title,
        image,
        content,
        weather,
        tag,
      },
      {
        where: {
          postId,
        },
      },
    );
    return post;
  };

  //일기장 삭제
  deletePost = async (postId) => {
    console.log(postId);
    await Posts.destroy({
      where: {
        postId,
      },
    });
  };
}

module.exports = PostRepository;

//생성, 수정, 삭제는 변수를 지정해서 바로 리턴하지 않는다.
