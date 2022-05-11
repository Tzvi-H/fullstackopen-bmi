interface ExerciseValues {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (
  exercises: Array<number>,
  target: number
): ExerciseValues => {
  const length = exercises.length;
  const average = exercises.reduce((a, b) => a + b) / length;
  const percentage = average / target;
  let rating;
  let ratingDescription;

  if (percentage >= 1) {
    rating = 3;
    ratingDescription = "great job";
  } else if (percentage >= 0.5) {
    rating = 2;
    ratingDescription = "not too bad but could be better";
  } else {
    rating = 1;
    ratingDescription = "you have lots of work to do";
  }

  return {
    periodLength: length,
    trainingDays: exercises.filter((e) => e !== 0).length,
    success: average >= target,
    rating,
    ratingDescription,
    target,
    average,
  };
};

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 1.9));
console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 20));
/*
{ periodLength: 7,
  trainingDays: 5,
  success: false,
  rating: 2,
  ratingDescription: 'not too bad but could be better',
  target: 2,
  average: 1.9285714285714286 }
*/
