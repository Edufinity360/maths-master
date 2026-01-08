import React, { useEffect, useState } from "react";
import axios from "axios";
import "./StudentPortal.css";

export default function StudentPortal() {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("live");
  const [selectedCourse, setSelectedCourse] = useState("Crash");

  /* ================= LIVE ================= */
  const [liveClasses, setLiveClasses] = useState([]);
  const [liveLoading, setLiveLoading] = useState(false);

  /* ================= NOTES ================= */
  const [notes, setNotes] = useState([]);
  const [notesLoading, setNotesLoading] = useState(false);
  const [homeworkList, setHomeworkList] = useState([]);// eslint-disable-next-line
  const [recordings, setRecordings] = useState([]);
  /* ================= PROFILE ================= */
  useEffect(() => {
    const email = localStorage.getItem("student-email");
    if (!email) {
      window.location.href = "/join";
      return;
    }

    const fetchProfile = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:6002/api/student/profile?email=${email}`
        );

        if (!data.success || !data.student) {
          alert("Profile not found");
          window.location.href = "/join";
          return;
        }

        setStudent(data.student);
        setSelectedCourse(data.student.courseType || "Crash");
      } catch {
        alert("Unable to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);
  
  /* ================= LIVE CLASSES ================= */
  useEffect(() => {
    if (!student) return;

    const fetchLiveClasses = async () => {
      setLiveLoading(true);
      try {
        const { data } = await axios.get(
          "http://localhost:6002/api/live-classes",
          {
            params: {
              class: student.class,
              board: student.board,
              courseType: selectedCourse,
            },
          }
        );
        setLiveClasses(data.success ? data.liveClasses : []);
      } catch {
        setLiveClasses([]);
      } finally {
        setLiveLoading(false);
      }
    };

    fetchLiveClasses();
  }, [student, selectedCourse]);
   
  useEffect(() => {
  if (activeTab === "homework") {
    fetchStudentHomework();
  }
  // eslint-disable-next-line
}, [activeTab]);

const fetchStudentHomework = async () => {
  try {
    const { data } = await axios.get(
      "http://localhost:6002/api/admin/homework",
      {
        params: {
          class: student.class,
          board: student.board,
          courseType: student.courseType,
        },
      }
    );

    if (data.success) {
      setHomeworkList(data.homework);
    }
  } catch (err) {
    console.error("Homework fetch error", err);
  }
};

useEffect(() => {
  if (activeTab === "recordings") {
    fetchRecordings();
  }
  // eslint-disable-next-line
}, [activeTab]);

    const fetchRecordings = async () => {
  try {
    const { data } = await axios.get(
      "http://localhost:6002/api/recordings",
      {
        params: {
          class: student.class,
          board: student.board,
          courseType: student.courseType,
        },
      }
    );

    if (data.success) {
      setRecordings(data.recordings);
    }
  } catch (err) {
    console.error(err);
    setRecordings([]);
  }
};
  /* ================= NOTES FETCH ================= */
  useEffect(() => {
    if (!student || activeTab !== "notes") return;

    const fetchNotes = async () => {
      setNotesLoading(true);
      try {
        const { data } = await axios.get(
          "http://localhost:6002/api/notes",
          {
            params: {
              class: student.class,
              board: student.board,
              courseType: selectedCourse,
            },
          }
        );
        setNotes(data.success ? data.notes : []);
      } catch {
        setNotes([]);
      } finally {
        setNotesLoading(false);
      }
    };

    fetchNotes();
  }, [activeTab, student, selectedCourse]);

  if (loading) return <div className="portal-loading">Loading...</div>;
  if (!student) return null;

  return (
    <div className="portal-container">
      {/* HEADER */}
      <header className="portal-header">
        <div className="portal-brand">
          <span className="portal-title">MATHS MASTER – Student Portal</span>
        </div>

        <div className="portal-student-card">
          <h2>{student.name}</h2>
          <p>{student.email}</p>
          <p>
            Class: <strong>{student.class}</strong> | Board:{" "}
            <strong>{student.board}</strong>
          </p>
          <p>
            Course: <strong>{student.courseType}</strong>
          </p>
          <p>
            Status:{" "}
            <strong className={student.isPaid ? "tag-paid" : "tag-unpaid"}>
              {student.isPaid ? "Paid" : "Pending"}
            </strong>
          </p>
        </div>
      </header>

      {/* COURSE TOGGLE */}
      <div className="portal-course-toggle">
        <button
          className={selectedCourse === "Crash" ? "active" : ""}
          onClick={() => setSelectedCourse("Crash")}
        >
          Crash Course
        </button>
        <button
          className={selectedCourse === "Regular" ? "active" : ""}
          onClick={() => setSelectedCourse("Regular")}
        >
          Regular Course
        </button>
      </div>

      {/* TABS */}
      <div className="portal-tabs">
        {["live", "homework", "notes", "recordings"].map((t) => (
          <button
            key={t}
            className={activeTab === t ? "tab active" : "tab"}
            onClick={() => setActiveTab(t)}
          >
            {t.toUpperCase()}
          </button>
        ))}
      </div>

      {/* CONTENT */}
      <div className="portal-content">
        {/* LIVE */}
        {activeTab === "live" && (
          <>
            {liveLoading ? (
              <p>No live classes</p>
            ) : (
              liveClasses.map((cls) => (
                <div key={cls._id} className="item-card">
                  <p>
                    {new Date(cls.startTime).toLocaleString()} –{" "}
                    {new Date(cls.endTime).toLocaleString()}
                  </p>
                  <button onClick={() => window.open(cls.joinLink, "_blank")}>
                    Join Live
                  </button>
                </div>
              ))
            )}
          </>
        )}

        {/* HOMEWORK */}
{activeTab === "homework" && (
  <div className="student-homework">

    {homeworkList.length === 0 ? (
      <p className="empty-text">No homework assigned yet.</p>
    ) : (
      homeworkList.map((hw) => (
        <div key={hw._id} className="homework-card">
          <h4>{hw.title}</h4>

          <div className="hw-meta">
            Class: {hw.class} | {hw.board} | {hw.courseType}
          </div>

          <p className="hw-desc">{hw.description}</p>
        </div>
      ))
    )}

  </div>
)}

        {/* NOTES (WORKING) */}
        {activeTab === "notes" && (
          <>
            {notesLoading ? (
              <p>Loading notes...</p>
            ) : notes.length === 0 ? (
              <p className="empty-text">No notes available.</p>
            ) : (
              notes.map((note) => (
                <div key={note._id} className="item-card">
                  <h4>{note.title}</h4>
                  <button onClick={() => window.open(note.fileUrl, "_blank")}>
                    View / Download
                  </button>
                </div>
              ))
            )}
          </>
        )}

        {/* RECORDINGS (FUTURE) */}
        {activeTab === "recordings" && (
  <div className="recording-section">
    {recordings.length === 0 ? (
      <p className="empty-text">No recordings available</p>
    ) : (
      <table className="recording-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody>
          {recordings.map((r) => (
            <tr key={r._id}>
              <td>{r.title}</td>
              <td>
                <a href={r.link} target="_blank" rel="noreferrer">
                  Open
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )}
  </div>
)}
      </div>
    </div>
  );
}