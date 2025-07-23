import { useEffect, useState } from 'react';

export default function usePagination(currentPage, totalPages) {
  const [arrOfCurrButtons, setArrOfCurrButtons] = useState([]);

  useEffect(() => {
    const numOfButtons = [];
    for (let i = 1; i <= totalPages; i++) {
      numOfButtons.push(i);
    }
    let previousPage = totalPages -1 ;
    let tempButtons = [...arrOfCurrButtons];
    const dotsInitial = '...';
    const dotsLeft = '... ';
    const dotsRight = ' ...';

    if (numOfButtons.length < 6) {
      tempButtons = numOfButtons;
    } else if (currentPage >= 1 && currentPage <= 3) {
      tempButtons = [1, 2, 3, 4, dotsInitial, totalPages];
    } else if (currentPage === 4) {
      const sliced = numOfButtons.slice(0, 5);
      tempButtons = [...sliced, dotsInitial, totalPages];
    } else if (currentPage > 4 && currentPage < totalPages - 2) {
      const sliced1 = numOfButtons.slice(currentPage - 2, currentPage);
      const sliced2 = numOfButtons.slice(currentPage, currentPage + 1);
      tempButtons = [1, dotsLeft, ...sliced1, ...sliced2, dotsRight, totalPages];
    } else if (currentPage > totalPages - 3) {
      const sliced = numOfButtons.slice(totalPages - 4);
      tempButtons = [1, dotsLeft, ...sliced];
    }

    if (currentPage === dotsInitial) {
      setArrOfCurrButtons(prev => prev[prev.length - 3] + 1);
    } else if (currentPage === dotsRight) {
      setArrOfCurrButtons(prev => prev[3] + 2);
    } else if (currentPage === dotsLeft) {
      setArrOfCurrButtons(prev => prev[3] - 2);
    } else {
      setArrOfCurrButtons(tempButtons);
    }
  }, [currentPage, totalPages]);

  return arrOfCurrButtons;
}
