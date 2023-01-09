const { Users, Diaries, Posts, Bookmark_post, Comments } = require('../models');
const { Sequelize } = require('sequelize');
class PostRepository {
  constructor(PostModel) {
    this.postModel = PostModel;
  }

  //일기장 생성
  createPost = async (userId, diaryId, title, image, content, weather, tag) => {
    await this.postModel.create({
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
    const post = await this.postModel.findAll({
      where: {
        diaryId,
      },
      attributes: [
        'postId',
        [Sequelize.col('User.nickname'), 'nickname'],
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
  //   const post = await this.postModel.findOne({
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
    await this.postModel.update(
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
  };

  //일기장 삭제
  deletePost = async (postId) => {
    await this.postModel.destroy({
      where: {
        postId,
      },
    });
  };

  findAllPostBookmark = async (diaryId, userId) => {};
}

module.exports = PostRepository;
