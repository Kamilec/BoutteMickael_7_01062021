const db = require('../models/Index');
const Post = db.posts;
const User = db.users;
const Comment = db.comments;

exports.createPost = (req, res, next) => {
  let imagePost = '';
  if (req.file) {
    imagePost = `${req.protocol}://${req.get('host')}/images/${
      req.file.filename
    }`;
  }
  const post = new Post({
    UserId: req.body.UserId,
    post: req.body.post,
    postUrl: imagePost,
  });
  console.log(message);
  post
    .save()
    .then(() => res.status(201).json({ message: 'Publication réussie' }))
    .catch((error) => res.status(400).json({ error }));
  //}
};

exports.findAllPosts = (req, res, next) => {
  Post.findAll({
    include: { model: User, required: true, attributes: ['Pseudo'] },
    order: [['id', 'DESC']],
  })
    .then((posts) => {
      const list = posts.map((post) => {
        return Object.assign(
          {},
          {
            id: post.id,
            createdAt: post.createdAt,
            post: post.post,
            messageUrl: post.postUrl,
            UserId: post.UserId,
            pseudo: post.User.pseudo,
            isActive: post.User.isActive,
          }
        );
      });
      res.status(200).json({ list });
    })
    .catch((error) => res.status(400).json({ error }));
};

exports.findOnePost = (req, res, next) => {
  const onePost = {};
  Post.findOne({
    where: { id: req.params.id },
    include: {
      model: User,
      required: true,
      attributes: ['Pseudo'],
    },
    order: [['id', 'DESC']],
  })
    .then((message) => {
      onePost.id = post.id;
      onePost.userId = post.UserId;
      onePost.pseudo = post.User.pseudo;
      onePost.createdAt = post.createdAt;
      onePost.post = post.post;
      onePost.postUrl = post.postUrl;
      res.status(200).json(onePost);
    })
    .catch((error) => res.status(404).json({ error }));
};

exports.findAllPostsForOne = (req, res, next) => {
  let list = '';
  Post.findAll({
    where: { UserId: req.params.id },
  })
    .then((res) => {
      list = res;
      res.status(200).json({ list });
    })
    .catch((error) => {
      res.status(404).json({ error });
    });
};

exports.deletePost = (req, res, next) => {
  if (req.query.postUid == req.query.uid || req.query.uid == 1) {
    Comment.destroy({ where: { MessageId: req.query.messageId } });
    Post.destroy({ where: { id: req.query.messageId } })
      .then((res) => {
        res
          .status(200)
          .json({ message: 'Message and its comments have been destroyed' });
      })
      .catch((error) => res.status(400).json({ error }));
  } else {
    res.status(401).json({ message: ' unauthorized ' });
  }
};

exports.likeDislikePost = (req, res, next) => {
  const like = req.body.like;
  const userId = req.body.userId;
  const id = req.params.id;

  //Définir le statut de like (1,-1,0,defaut)
  switch (like) {
    case 1: //L'utilisateur aime la publication
      Comment.updateOne(
        { _id: id },
        {
          $inc: { likes: 1 }, //On incrémente les likes
          $push: { usersLiked: userId }, //On ajoute l'utilisateur au tableau usersLiked
        }
      )
        .then(() =>
          res.status(201).json({ message: `Vous avez liké la publication` })
        )
        .catch((error) => res.status(400).json({ error }));
      break;
    case -1: //L'utilisateur n'aime pas la publication
      Comment.updateOne(
        { _id: id },
        {
          $inc: { dislikes: 1 }, //On incrémente les dislikes
          $push: { usersDisliked: userId }, //On ajoute l'utilisateur au tableau usersDisliked
        }
      )
        .then(() =>
          res.status(200).json({ message: `Vous avez disliké la publication` })
        )
        .catch((error) => res.status(400).json({ error }));
      break;
    case 0:
      Comment.findOne({ _id: id })
        .then((comment) => {
          if (comment.usersLiked.includes(userId)) {
            Comment.updateOne(
              { _id: id },
              {
                $inc: { likes: -1 }, //On décrémente likes
                $pull: { usersLiked: userId }, //On sort l'utilisateur du tableau usersLiked
                _id: req.params.id,
              }
            )
              .then(() => {
                res.status(200).json({
                  message: `Vous avez annulé votre like ${publication.name}`,
                });
              })
              .catch((error) => res.status(400).json({ error }));
          }
          if (comment.usersDisliked.includes(userId)) {
            Comment.updateOne(
              { _id: id },
              {
                $inc: { dislikes: -1 }, //On décrémentes dislikes
                $pull: { usersDisliked: userId }, //On sort l'utilisateur du tableau usersDisliked
              }
            )
              .then(() =>
                res.status(200).json({
                  message: `Vous avez annulé votre dislike ${comment.name}`,
                })
              )
              .catch((error) => res.status(400).json({ error }));
          }
        })
        .catch((error) => res.status(500).json({ error }));
      break;

    default:
      alert(`Merci de contacter l'admin !`);
      break;
  }
};
