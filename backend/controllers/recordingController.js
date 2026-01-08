import Recording from "../models/Recording.js";

/* ADD */
export const addRecording = async (req, res) => {
  try {
    const { title, link, class: cls, board, courseType } = req.body;

    if (!title || !link || !cls || !board || !courseType) {
      return res.json({ success: false, message: "All fields required" });
    }

    const recording = await Recording.create({
      title,
      link,
      class: cls,
      board,
      courseType,
    });

    res.json({ success: true, recording });
  } catch {
    res.status(500).json({ success: false });
  }
};

/* GET */
export const getRecordings = async (req, res) => {
  const { class: cls, board, courseType } = req.query;

  const query = {};
  if (cls) query.class = cls;
  if (board) query.board = board;
  if (courseType) query.courseType = courseType;

  const recordings = await Recording.find(query).sort({ createdAt: -1 });

  res.json({ success: true, recordings });
};

/* DELETE */
export const deleteRecording = async (req, res) => {
  await Recording.findByIdAndDelete(req.params.id);
  res.json({ success: true });
};