import express from "express";
import calculateBmi from "./bmiCalculator";
import calculateExercises from "./exerciseCalculator";

const app = express();
app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (isNaN(height) || isNaN(weight)) {
    return res.json({
      error: "malformatted parameters",
    });
  }

  const bmi = calculateBmi(height, weight);

  return res.json({
    weight,
    height,
    bmi,
  });
});

app.post("/exercises", (req, res) => {
  const target = req.body.target;
  const exercises = req.body.daily_exercises;

  if (!exercises || !target) {
    return res.json({
      error: "parameters missing",
    });
  }

  if (isNaN(target) || exercises.some((e: number) => isNaN(e))) {
    return res.json({
      error: "malformatted parameters",
    });
  }

  const exerciseValues = calculateExercises(exercises, target);

  return res.json(exerciseValues);
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
