const { Sequelize, QueryTypes, Op } = require('sequelize');
const { sequelize } = require('../models');

class PostRepository {
  constructor(PostModel) {
    this.postModel = PostModel;
  }

  // View Table 생성 (댓글 카운트용)
  /*
create view CountTable as
select Posts.postId ,count(Comments.postId) as commentsCount
from Posts LEFT JOIN Comments
on Posts.postId = Comments.postId
group by Posts.postId
*/

  //일기장 생성
  createPost = async (
    userId,
    diaryId,
    title,
    image,
    content,
    weather,
    tag,
    createdAt,
  ) => {
    await this.postModel.create({
      userId,
      diaryId,
      title,
      image,
      content,
      weather,
      tag,
      createdAt,
    });
  };

  //일기장 전체 조회
  findPost = async (diaryId) => {
    const query = `SELECT Posts.postId,Posts.userId,Users.nickname,title,image,tag,profileImg,IFNULL(commentsCount,0) as commentsCount,if(bookmarkId IS NULL, FALSE,TRUE) as bookmark,Posts.createdAt
    FROM Posts LEFT JOIN CountTable 
    ON Posts.postId = CountTable.postId
    LEFT JOIN Users
    On Posts.userId = Users.userId
	  LEFT JOIN  Bookmark_posts
    On Posts.postId = Bookmark_posts.postId
    where Posts.diaryId = ${diaryId}
    ORDER BY Posts.createdAt DESC
   `;
    const queryResult = await sequelize.query(query, {
      type: QueryTypes.SELECT,
    });
    return queryResult;
  };

  //일기장 상세 조회
  findDetailPost = async (postId) => {
    const query = `SELECT Posts.postId,Posts.diaryId,Posts.userId,Users.nickname,Users.profileImg,title,content,insideColor,image,weather,tag,IFNULL(commentsCount,0) as commentsCount,if(bookmarkId IS NULL, FALSE,TRUE) as bookmark,Posts.createdAt
    FROM Posts LEFT JOIN CountTable  
    ON Posts.postId = CountTable.postId
    LEFT JOIN Users
    On Posts.userId = Users.userId
    LEFT JOIN Diaries
    On Posts.diaryId = Diaries.diaryId
	  LEFT JOIN  Bookmark_posts
    On Posts.postId = Bookmark_posts.postId
    where Posts.postId = ${postId}
    ORDER BY Posts.createdAt DESC
    `;
    const queryResult = await sequelize.query(query, {
      type: QueryTypes.SELECT,
    });
    return queryResult[0];
  };

  //일기장 수정
  patchPost = async (
    userId,
    postId,
    title,
    image,
    content,
    weather,
    tag,
    createdAt,
  ) => {
    await this.postModel.update(
      {
        userId,
        title,
        image,
        content,
        weather,
        tag,
        createdAt,
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

  findAllPostBookmark = async (diaryId, userId) => {
    const query = `SELECT Posts.postId,Posts.userId,Users.nickname,title,image,tag,profileImg,IFNULL(commentsCount,0) as commentsCount,Posts.createdAt
    FROM Posts LEFT JOIN CountTable 
    ON Posts.postId = CountTable.postId
    LEFT JOIN Users
    On Posts.userId = Users.userId
    right JOIN Bookmark_posts
    On Posts.userId = Bookmark_posts.userId and Posts.postId = Bookmark_posts.postId
    where Bookmark_posts.userId = ${userId} and Posts.diaryId = ${diaryId}
   `;
    const queryResult = await sequelize.query(query, {
      type: QueryTypes.SELECT,
    });
    return queryResult;
  };

  //태그 목록 조회
  findTag = async (diaryId) => {
    return await this.postModel.findAll({
      where: { diaryId },
      attributes: [Sequelize.fn('DISTINCT', Sequelize.col('tag')), 'tag'],
    });
  };

  //타이틀로 검색
  searchPostTitle = async (diaryId, title) => {
    const query = `SELECT Posts.postId,Posts.userId,Users.nickname,title,image,tag,profileImg,IFNULL(commentsCount,0) as commentsCount,Posts.createdAt
    FROM Posts LEFT JOIN CountTable 
    ON Posts.postId = CountTable.postId
    LEFT JOIN Users
    On Posts.userId = Users.userId
    where Posts.diaryId = ${diaryId} and title LIKE '%${title}%'
   ORDER BY Posts.createdAt DESC
   `;
    const queryResult = await sequelize.query(query, {
      type: QueryTypes.SELECT,
    });
    return queryResult;
  };

  //내용으로 검색
  searchPostContent = async (diaryId, content) => {
    const query = `SELECT Posts.postId,Posts.userId,Users.nickname,title,image,tag,profileImg,IFNULL(commentsCount,0) as commentsCount,Posts.createdAt
    FROM Posts LEFT JOIN CountTable 
    ON Posts.postId = CountTable.postId
    LEFT JOIN Users
    On Posts.userId = Users.userId
    where Posts.diaryId = ${diaryId} and content LIKE '%${content}%'
   ORDER BY Posts.createdAt DESC
   `;
    const queryResult = await sequelize.query(query, {
      type: QueryTypes.SELECT,
    });
    return queryResult;
  };

  //태그로 검색
  searchPostTag = async (diaryId, tag) => {
    const query = `SELECT Posts.postId,Posts.userId,Users.nickname,title,image,tag,profileImg,IFNULL(commentsCount,0) as commentsCount,Posts.createdAt
    FROM Posts LEFT JOIN CountTable 
    ON Posts.postId = CountTable.postId
    LEFT JOIN Users
    On Posts.userId = Users.userId
    where Posts.diaryId = ${diaryId} and tag LIKE '${tag}'
   ORDER BY Posts.createdAt DESC
   `;
    const queryResult = await sequelize.query(query, {
      type: QueryTypes.SELECT,
    });
    return queryResult;
  };
}

module.exports = PostRepository;
