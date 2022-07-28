import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/useApps';
import { fetchAddComment } from '../../store/filmSlice';

type ReviewPostProps = {
  id: string;
  token: string;
};

function FormReview({ id, token }: ReviewPostProps): JSX.Element {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [errorComment, setErrorComment] = useState('Review cannot be empty!');
  const [formValid, setFornValid] = useState(false);

  useEffect(() => {
    if (errorComment || rating === 0) {
      setFornValid(false);
    } else {
      setFornValid(true);
    }
  }, [errorComment, rating]);

  useEffect(() => {
    setRating(0);
    setComment('');
    setErrorComment('Review cannot be empty!');
  }, [id]);

  const CommentHandler = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setComment(e.target.value);
    if (e.target.value.length <= 50) {
      setErrorComment('Review must be at least 50 characters long.');
    } else {
      setErrorComment('');
    }
  };

  const RatingHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRating(+e.target.value);
  };

  const dispatch = useAppDispatch();
  const commentPostId = { id, comment, rating, token };

  const navigate = useNavigate();
  const goMain = () => navigate(`/films/${id}`);

  const sendComment = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    dispatch(fetchAddComment(commentPostId));
    setComment('');
    setRating(0);
    setErrorComment('Review cannot be empty!');
    goMain();
  };
  return (
    <div className="add-review">
      <form onSubmit={sendComment} action="#" className="add-review__form">
        <div className="rating">
          <div className="rating__stars">
            <input
              checked={rating === 10}
              onChange={(e) => RatingHandler(e)}
              className="rating__input"
              id="star-10"
              type="radio"
              name="rating"
              value="10"
            />
            <label className="rating__label" htmlFor="star-10">
              Rating 10
            </label>

            <input
              checked={rating === 9}
              onChange={(e) => RatingHandler(e)}
              className="rating__input"
              id="star-9"
              type="radio"
              name="rating"
              value="9"
            />
            <label className="rating__label" htmlFor="star-9">
              Rating 9
            </label>

            <input
              checked={rating === 8}
              onChange={(e) => RatingHandler(e)}
              className="rating__input"
              id="star-8"
              type="radio"
              name="rating"
              value="8"
            />
            <label className="rating__label" htmlFor="star-8">
              Rating 8
            </label>

            <input
              checked={rating === 7}
              onChange={(e) => RatingHandler(e)}
              className="rating__input"
              id="star-7"
              type="radio"
              name="rating"
              value="7"
            />
            <label className="rating__label" htmlFor="star-7">
              Rating 7
            </label>

            <input
              checked={rating === 6}
              onChange={(e) => RatingHandler(e)}
              className="rating__input"
              id="star-6"
              type="radio"
              name="rating"
              value="6"
            />
            <label className="rating__label" htmlFor="star-6">
              Rating 6
            </label>

            <input
              checked={rating === 5}
              onChange={(e) => RatingHandler(e)}
              className="rating__input"
              id="star-5"
              type="radio"
              name="rating"
              value="5"
            />
            <label className="rating__label" htmlFor="star-5">
              Rating 5
            </label>

            <input
              checked={rating === 4}
              onChange={(e) => RatingHandler(e)}
              className="rating__input"
              id="star-4"
              type="radio"
              name="rating"
              value="4"
            />
            <label className="rating__label" htmlFor="star-4">
              Rating 4
            </label>

            <input
              checked={rating === 3}
              onChange={(e) => RatingHandler(e)}
              className="rating__input"
              id="star-3"
              type="radio"
              name="rating"
              value="3"
            />
            <label className="rating__label" htmlFor="star-3">
              Rating 3
            </label>

            <input
              checked={rating === 2}
              onChange={(e) => RatingHandler(e)}
              className="rating__input"
              id="star-2"
              type="radio"
              name="rating"
              value="2"
            />
            <label className="rating__label" htmlFor="star-2">
              Rating 2
            </label>

            <input
              checked={rating === 1}
              onChange={(e) => RatingHandler(e)}
              className="rating__input"
              id="star-1"
              type="radio"
              name="rating"
              value="1"
            />
            <label className="rating__label" htmlFor="star-1">
              Rating 1
            </label>
          </div>
        </div>

        <div className="add-review__text">
          <textarea
            onChange={(e) => CommentHandler(e)}
            value={comment}
            maxLength={400}
            className="add-review__textarea"
            name="review-text"
            id="review-text"
            placeholder="Review text"
          >
          </textarea>
          <div className="add-review__submit">
            <button
              className="add-review__btn"
              type="submit"
              disabled = {!formValid}
            >
              Post
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default FormReview;
