
export function getTimeDifference(timestamp) {
    const targetDate = new Date(timestamp);
    const currentDate = new Date();
    const diffMs = Math.abs(targetDate - currentDate);

    const diffMinutesTotal = Math.floor(diffMs / (1000 * 60));
    const days = Math.floor(diffMinutesTotal / (60 * 24));
    const hours = Math.floor((diffMinutesTotal % (60 * 24)) / 60);
    const minutes = diffMinutesTotal % 60;

    const isExactDay = hours === 0 && minutes === 0;

    return { days, hours, minutes, isExactDay };
}

// export  const filterByLast48Hours = (data = []) => {
//     return data.filter((item) => {
//       const timeDiff = getTimeDifference(item.Created);
//       const totalHours = (timeDiff.days || 0) * 24 + (timeDiff.hours || 0);
//       return totalHours < 48
//     });
//   };

export const filterByLast48Hours = (data = []) => {
  const now = new Date().getTime();

  return data.filter((item) => {
    const createdTime = new Date(item.Created).getTime();
    const timeDiffInHours = (now - createdTime) / (1000 * 60 * 60); // milliseconds to hours
    return timeDiffInHours < 48;
  });
};


export const filterByLast14Days = (data = []) => {
  const now = new Date().getTime();

  return data.filter((item) => {
    const createdTime = new Date(item.Created).getTime();
    const timeDiffInDays = (now - createdTime) / (1000 * 60 * 60 * 24); // ms to days
    return timeDiffInDays < 14;
  });
};

export const filterByLast30Days = (data = []) => {
  const now = new Date().getTime();

  return data.filter((item) => {
    const createdTime = new Date(item.Created).getTime();
    const timeDiffInDays = (now - createdTime) / (1000 * 60 * 60 * 24); // convert ms to days
    return timeDiffInDays < 30;
  });
};

