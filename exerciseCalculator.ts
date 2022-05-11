interface ArgvExerciseValues {
  target: number;
  exercises: Array<number>;
}

const parseArguments = (args: Array<string>): ArgvExerciseValues => {
  if (args.length < 4) throw new Error("Not enough arguments");

  const argNums = args.slice(2).map((a) => Number(a));
  if (!argNums.some((n) => isNaN(n))) {
    return {
      target: argNums[0],
      exercises: argNums.slice(1),
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

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

try {
  const { target, exercises } = parseArguments(process.argv);
  console.log(calculateExercises(exercises, target));
} catch (error: unknown) {
  let errorMessage = "Something bad happened.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}
