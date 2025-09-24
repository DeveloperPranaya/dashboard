// components/BookmarkButton.js
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Tooltip from './tooltip';
import bookmarkIcon from '../../assets/images/navbar/bookmark.svg';
import { isBookmarked } from './commonfunction';
import { addBookMark, deleteBookMark, fetchBookMark } from '../../redux/bookmarkSlice';

const BookmarkButton = ({ contractRowKey, contractTitle }) => {
  const dispatch = useDispatch();
  const { bookMarks = [] } = useSelector(state => state.bookMark);

  const handleBookmarkClick = async () => {
    const alreadyBookmarked = isBookmarked(contractRowKey, bookMarks);

    try {
      if (alreadyBookmarked) {
        await dispatch(deleteBookMark({ contractId: contractRowKey, userId: "" })).unwrap();
        toast.success("✅ Bookmark removed");
      } else {
        await dispatch(
          addBookMark({
            contractID: contractRowKey,
            contractTitle,
            userID: ""
          })
        ).unwrap();
        toast.success("✅ Successfully bookmarked");
      }

      dispatch(fetchBookMark());
    } catch (err) {
      toast.error(`❌ ${err.message || 'Operation failed'}`);
    }
  };

  return (
    <Tooltip text="Bookmark">
      <img
        src={bookmarkIcon}
        alt="bookmark"
        onClick={handleBookmarkClick}
        className={`bookmark-image${isBookmarked(contractRowKey, bookMarks) ? " active-bookmark" : ""}`}
      />
    </Tooltip>
  );
};

export default BookmarkButton;
