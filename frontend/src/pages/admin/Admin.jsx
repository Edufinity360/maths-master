import { useEffect, useState } from "react";
import axios from "axios";
import "./Admin.css";

export default function Admin() {
  const [activeTab, setActiveTab] = useState("live");
  const [showModal, setShowModal] = useState(false);
  const [admins, setAdmins] = useState([]);// eslint-disable-next-line
const [showAdminModal, setShowAdminModal] = useState(false);

const [adminForm, setAdminForm] = useState({
  name: "",
  email: "",
  password: "",
});
  /* ================= STUDENTS ================= */
  const [students, setStudents] = useState([]);
  const [loadingStudents, setLoadingStudents] = useState(false);
  const [leads, setLeads] = useState([]);
const [loadingLeads, setLoadingLeads] = useState(false);
const [liveClasses, setLiveClasses] = useState([]);
  /* ================= NOTES ================= */
  const [notes, setNotes] = useState([]);
  const [noteFile, setNoteFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [homeworkList, setHomeworkList] = useState([]);
const [hwForm, setHwForm] = useState({
  title: "",
  description: "",
  class: "",
  board: "",
  courseType: "",
});
  const [recordings, setRecordings] = useState([]);
const [recForm, setRecForm] = useState({
  title: "",
  link: "",
  class: "",
  board: "",
  courseType: "",
});
  /* ================= FILTER ================= */
  const [filter, setFilter] = useState({
    class: "",
    board: "",
    courseType: "",
  });

  /* ================= FORM ================= */
  const [form, setForm] = useState({
    title: "",
    class: "",
    board: "",
    courseType: "",
    joinLink: "",
    startTime: "",
    endTime: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleFileChange = (e) => setNoteFile(e.target.files[0]);

  /* ================= FETCH STUDENTS ================= */
  useEffect(() => {
  if (activeTab !== "students") return;
 
  const fetchStudents = async () => {
    setLoadingStudents(true);
    try {
      const { data } = await axios.get(
  "/api/admin/students",
  {
    params: {
      ...filter,
      type: "students", // 👈 PAID STUDENTS
    },
  }
);

      setStudents(data.success ? data.students : []);
    } catch (err) {
      console.error("FETCH STUDENTS ERROR", err);
      setStudents([]);
    } finally {
      setLoadingStudents(false);
    }
  };

  fetchStudents();
}, [activeTab, filter]);
  const deleteStudent = async (id) => {
  if (!window.confirm("Are you sure you want to delete this student?")) return;

  try {
    const res = await axios.delete(
      `/api/admin/students/${id}`
    );

    if (res.data.success) {
      alert("Student deleted successfully");
    
    } else {
      alert("Delete failed");
    }
  } catch (err) {
    console.error(err);
    alert("Delete failed");
  }
};
 useEffect(() => {
  if (activeTab === "homework") {
    fetchHomework(); // 👈 NO FILTER
  } // eslint-disable-next-line
}, [activeTab]);
const fetchHomework = async (customFilter = filter) => {
  try {
    const { data } = await axios.get(
      "/api/admin/homework",
      { params: customFilter }
    );

    if (data.success) {
      setHomeworkList(data.homework);
    }
  } catch (err) {
    console.error(err);
  }
};
const submitHomework = async () => {
  try {
    await axios.post("/api/admin/homework", hwForm);
    setHwForm({
      title: "",
      description: "",
      class: "",
      board: "",
      courseType: "",
    });
    fetchHomework();
    alert("Homework added");
  } catch (err) {
    alert("Homework failed");
  }
};

useEffect(() => {
  if (activeTab === "recordings") {
    fetchRecordings();
  }
  // eslint-disable-next-line
}, [activeTab]);
const deleteHomework = async (id) => {
  if (!window.confirm("Delete homework?")) return;
  await axios.delete(
    `/api/admin/homework/${id}`
  );
  fetchHomework();
};

   const fetchRecordings = async () => {
  const { data } = await axios.get(
    "/api/recordings",
    { params: recForm }
  );
  if (data.success) setRecordings(data.recordings);
};

const addRecording = async () => {
  await axios.post(
    "/api/recordings",
    recForm
  );
  fetchRecordings();
};

const deleteRecording = async (id) => {
  await axios.delete(
    `/api/recordings/${id}`
  );
  fetchRecordings();
};

/* ================= FETCH LEADS ================= */
useEffect(() => {
  if (activeTab !== "leads") return;

  const fetchLeads = async () => {
    setLoadingLeads(true);
    try {
      const { data } = await axios.get(
  "/api/admin/students",
  {
    params: {
      ...filter,
      type: "leads", // 👈 UNPAID STUDENTS
    },
  }
);
      if (data.success) {
        // 🔑 only unpaid students
        setLeads(data.students.filter(s => s.isPaid === false));
      } else {
        setLeads([]);
      }
    } catch (err) {
      console.error("FETCH LEADS ERROR", err);
      setLeads([]);
    } finally {
      setLoadingLeads(false);
    }
  };

  fetchLeads();
}, [activeTab, filter]);

useEffect(() => {
  if (activeTab === "addUser") {
    fetchAdmins();
  }
}, [activeTab]);
const fetchAdmins = async () => {
  try {
    const { data } = await axios.get("/api/admin");

    if (data.success) {
      setAdmins(data.admins);
    }
  } catch (err) {
    console.error("FETCH ADMINS ERROR", err);
  }
};// eslint-disable-next-line
const createAdmin = async () => {
  try {
    await axios.post("/api/admin/create", adminForm);
    alert("Admin added");
    setShowAdminModal(false);
    setAdminForm({ name: "", email: "", password: "" });
    fetchAdmins();
  } catch (err) {
    alert("Add admin failed");
  }
};
const deleteAdmin = async (id) => {
  if (!window.confirm("Delete this admin?")) return;

  try {
    await axios.delete(`/api/admin/${id}`);
    fetchAdmins();
  } catch (err) {
    alert("Delete failed");
  }
};
  /* ================= LIVE CLASS ================= */
  const submitLiveClass = async () => {
    try {
      await axios.post("/api/live-classes", {
        class: form.class,
        board: form.board,
        courseType: form.courseType,
        joinLink: form.joinLink,
        startTime: form.startTime,
        endTime: form.endTime,
        batch: 1,
      });
      alert("Live class created");
      setShowModal(false);
    } catch {
      alert("Error creating live class");
    }
  };

  useEffect(() => {
  if (activeTab === "live") {
    fetchLiveClasses();
  } // eslint-disable-next-line
}, [activeTab, filter]);
const fetchLiveClasses = async () => {
  try {
    const { data } = await axios.get(
      "/api/live-classes/admin"
    );

    if (data.success) {
      setLiveClasses(data.liveClasses);
    }
  } catch (err) {
    console.error("FETCH LIVE CLASSES ERROR", err);
  }
};
const deleteLiveClass = async (id) => {
  if (!window.confirm("Delete this live class?")) return;

  try {
    await axios.delete(
      `/api/live-classes/${id}`
    );
    fetchLiveClasses();
  } catch (err) {
    alert("Delete failed");
  }
};
  /* ================= NOTES ================= */
  const fetchNotes = async () => {
    try {
      const { data } = await axios.get("/api/notes", {
        params: filter,
      });
      setNotes(data.success ? data.notes : []);
    } catch {
      setNotes([]);
    }
  };

  useEffect(() => {
    if (activeTab === "notes") fetchNotes();// eslint-disable-next-line
  }, [activeTab, filter]); 

  const uploadNotes = async () => {
  if (
    !noteFile ||
    !form.title ||
    !form.class ||
    !form.board ||
    !form.courseType
  ) {
    alert("All fields required");
    return;
  }

  const fd = new FormData();
  fd.append("title", form.title);
  fd.append("class", form.class);
  fd.append("board", form.board);
  fd.append("courseType", form.courseType);
  fd.append("file", noteFile);

  try {
    setUploading(true);

    // ❌ headers MAT bhejo – axios khud multipart handle karega
    await axios.post("/api/notes", fd);

    alert("Notes uploaded");

    // 🔑 IMPORTANT: filter ko uploaded values se sync karo
    setFilter({
      class: form.class,
      board: form.board,
      courseType: form.courseType,
    });

    setForm({
      ...form,
      title: "",
    });

    setNoteFile(null);

    // 🔑 notes list refresh
    fetchNotes();
  } catch (err) {
    console.error(err);
    alert("Upload failed");
  } finally {
    setUploading(false);
  }
};
  const deleteNote = async (id) => {
    await axios.delete(`/api/notes/${id}`);
    fetchNotes();
  };

  return (
    <div className="admin-layout">
      {/* ================= HEADER ================= */}
      <div className="admin-header">
        <h2>MATHS MASTER – Admin Panel</h2>
        <div className="admin-header-actions">
          
         <button
  className="logout-btn"
  onClick={() => {
    localStorage.removeItem("adminToken"); // token clear
    window.location.href = "/admin-login"; // admin login path
  }}
>
  Logout
</button>
        </div>
      </div>

      {/* ================= BODY ================= */}
      <div className="admin-body">
        {/* ===== SIDEBAR ===== */}
        <div className="admin-sidebar">
          {["live", "students", "leads", "addUser", "homework", "notes", "recordings"].map((t) => (
            <button
              key={t}
              className={activeTab === t ? "active" : ""}
              onClick={() => setActiveTab(t)}
            >
              {t.toUpperCase()}
            </button>
          ))}
        </div>

        {/* ===== CONTENT ===== */}
        <div className="admin-content">
          {/* LIVE */}
          {activeTab === "live" && (
  <>
    <h3>Live Classes</h3>

    <button
      className="primary-btn"
      onClick={() => setShowModal(true)}
    >
      + Create Live Class
    </button>

    <table className="admin-table" style={{ marginTop: "20px" }}>
      <thead>
        <tr>
          <th>Class</th>
          <th>Board</th>
          <th>Course</th>
          <th>Batch</th>
          <th>Start</th>
          <th>End</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        {liveClasses.length === 0 ? (
          <tr>
            <td colSpan="7" style={{ textAlign: "center" }}>
              No live classes
            </td>
          </tr>
        ) : (
          liveClasses.map((lc) => (
            <tr key={lc._id}>
              <td>{lc.class}</td>
              <td>{lc.board}</td>
              <td>{lc.courseType}</td>
              <td>{lc.batch}</td>
              <td>{new Date(lc.startTime).toLocaleString()}</td>
              <td>{new Date(lc.endTime).toLocaleString()}</td>
              <td>
                <button
                  className="delete-btn"
                  onClick={() => deleteLiveClass(lc._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  </>
)}

          {/* STUDENTS */}
          {activeTab === "students" && (
            <>
              <h3>Students</h3>
              <div className="student-filters">
                <select
                  value={filter.class}
                  onChange={(e) =>
                    setFilter({ ...filter, class: e.target.value })
                  }
                >
                   <option value="">All Class</option>
                  <option value="10">10</option>
                  <option value="11">11</option>
                  <option value="12">12</option>
                  <option value="MHT-CET">MHT-CET</option>
                </select>

                <select
                  value={filter.board}
                  onChange={(e) =>
                    setFilter({ ...filter, board: e.target.value })
                  }
                > 
                   <option value="">All Board</option>
                  <option value="CBSE">CBSE</option>
                  <option value="Maharashtra">Maharashtra</option>
                </select>

                <select
                  value={filter.courseType}
                  onChange={(e) =>
                    setFilter({ ...filter, courseType: e.target.value })
                  }
                >  
                   <option value="">All Course</option>
                  <option value="Crash">Crash</option>
                  <option value="Regular">Regular</option>
                </select>
              </div>

              {loadingStudents ? (
                <p>Loading...</p>
              ) : (
                <table className="student-table">
                  <thead>
  <tr>
    <th>Name</th>
    <th>Email</th>
    <th>Phone</th>
    <th>Class</th>
    <th>Board</th>
    <th>Course</th>
    <th style={{ width: "120px", textAlign: "center" }}>Action</th>
  </tr>
</thead>
                  <tbody>
  {students.map((s) => (
    <tr key={s._id}>
      <td>{s.name}</td>
      <td>{s.email}</td>
      <td>{s.phone}</td>
      <td>{s.class}</td>
      <td>{s.board}</td>
      <td>{s.courseType}</td>

      <td className="action-cell">
        <button
          className="delete-btn"
          onClick={() => deleteStudent(s._id)}
        >
          Delete
        </button>
      </td>
    </tr>
  ))}
</tbody>
                </table>
              )}
            </>
          )}

         {/* NOTES */}
{activeTab === "notes" && (
  <div className="notes-section">
    <h3>Upload Notes</h3>

    <div className="notes-upload-row">
      <input
        name="title"
        placeholder="Title"
        value={form.title}
        onChange={handleChange}
      />

      <select name="class" value={form.class} onChange={handleChange}>
        <option value="" disabled>Select Class</option>
        <option value="10">10</option>
        <option value="11">11</option>
        <option value="12">12</option>
        <option value="MHT-CET">MHT-CET</option>
      </select>

      <select name="board" value={form.board} onChange={handleChange}>
        <option value="" disabled>Select Board</option>
        <option value="CBSE">CBSE</option>
        <option value="Maharashtra">Maharashtra</option>
      </select>

      <select name="courseType" value={form.courseType} onChange={handleChange}>
        <option value="" disabled>Select Course</option>
        <option value="Crash">Crash</option>
        <option value="Regular">Regular</option>
      </select>

      <input type="file" accept="application/pdf" onChange={handleFileChange} />

      <button
        className="primary-btn"
        onClick={uploadNotes}
        disabled={uploading}
      >
        {uploading ? "Uploading..." : "Upload"}
      </button>
    </div>

    <hr />

    <h3>Uploaded Notes</h3>

    {notes.length === 0 ? (
      <p className="no-notes">No notes</p>
    ) : (
      <div className="uploaded-notes">
        {notes.map((n) => (
          <div key={n._id} className="note-item">
            <span>{n.title}</span>
            <div>
              <button onClick={() => window.open(n.fileUrl, "_blank")}>
                View
              </button>
              <button
                className="danger"
                onClick={() => deleteNote(n._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
)}

          {/* HOMEWORK (FUTURE) */}
         {activeTab === "homework" && (
  <div className="admin-homework">

    <div className="hw-form">

  {/* CLASS / BOARD / COURSE */}
  <div className="hw-filter-row">
    <select
      value={hwForm.class}
      onChange={(e) =>
        setHwForm({ ...hwForm, class: e.target.value })
      }
    >
      <option value="">Class</option>
      <option value="10">10</option>
      <option value="11">11</option>
      <option value="12">12</option>
      <option value="MHT-CET">MHT-CET</option>
    </select>

    <select
      value={hwForm.board}
      onChange={(e) =>
        setHwForm({ ...hwForm, board: e.target.value })
      }
    >
      <option value="">Board</option>
      <option value="CBSE">CBSE</option>
      <option value="Maharashtra">Maharashtra State</option>
    </select>

    <select
      value={hwForm.courseType}
      onChange={(e) =>
        setHwForm({ ...hwForm, courseType: e.target.value })
      }
    >
      <option value="">Course</option>
      <option value="Regular">Regular</option>
      <option value="Crash">Crash</option>
    </select>
  </div>

  {/* TITLE + BUTTON */}
  <div className="hw-row">
    <input
      className="hw-title"
      placeholder="Homework Title"
      value={hwForm.title}
      onChange={(e) =>
        setHwForm({ ...hwForm, title: e.target.value })
      }
    />

    <button className="hw-btn" onClick={submitHomework}>
      Add Homework
    </button>
  </div>

  {/* DESCRIPTION */}
  <textarea
    className="hw-textarea"
    placeholder="Write full homework here (teacher only)"
    value={hwForm.description}
    onChange={(e) =>
      setHwForm({ ...hwForm, description: e.target.value })
    }
  />
</div>

    {/* HOMEWORK LIST */}
    <table className="admin-table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Class</th>
          <th>Board</th>
          <th>Course</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {homeworkList.length === 0 ? (
          <tr>
            <td colSpan="5" style={{ textAlign: "center" }}>
              No homework added yet
            </td>
          </tr>
        ) : (
          homeworkList.map((hw) => (
            <tr key={hw._id}>
              <td>{hw.title}</td>
              <td>{hw.class}</td>
              <td>{hw.board}</td>
              <td>{hw.courseType}</td>
              <td>
                <button
                  className="delete-btn"
                  onClick={() => deleteHomework(hw._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>

  </div>
)}
        

         {/* ================= RECORDINGS ================= */}
{activeTab === "recordings" && (
  <div className="recording-section">

    <h3>Add Recording Link</h3>

    {/* FORM */}
    <div className="recording-form">
      <select
        value={recForm.class}
        onChange={(e) => setRecForm({ ...recForm, class: e.target.value })}
      >
        <option value="">Class</option>
        <option value="10">10</option>
        <option value="11">11</option>
        <option value="12">12</option>
        <option value="MHT-CET">MHT-CET</option>
      </select>

      <select
        value={recForm.board}
        onChange={(e) => setRecForm({ ...recForm, board: e.target.value })}
      >
        <option value="">Board</option>
        <option value="CBSE">CBSE</option>
        <option value="Maharashtra">Maharashtra</option>
      </select>

      <select
        value={recForm.courseType}
        onChange={(e) =>
          setRecForm({ ...recForm, courseType: e.target.value })
        }
      >
        <option value="">Course</option>
        <option value="Crash">Crash</option>
        <option value="Regular">Regular</option>
      </select>

      <input
        type="text"
        placeholder="Recording Title"
        value={recForm.title}
        onChange={(e) => setRecForm({ ...recForm, title: e.target.value })}
      />

      <input
        type="text"
        placeholder="Recording Link"
        value={recForm.link}
        onChange={(e) => setRecForm({ ...recForm, link: e.target.value })}
      />
    </div>

    {/* TABLE HEADER */}
    <div className="recording-header">
      <h3>Uploaded Recordings</h3>

      <button
        className="add-recording-btn"
        onClick={addRecording}
      >
        + Add Recording
      </button>
    </div>

    {/* TABLE */}
    <table className="recording-table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Link</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        {recordings.length === 0 ? (
          <tr>
            <td colSpan="3" className="empty-text">
              No recordings added yet
            </td>
          </tr>
        ) : (
          recordings.map((r) => (
            <tr key={r._id}>
              <td>{r.title}</td>
              <td>
                <a href={r.link} target="_blank" rel="noreferrer">
                  Open
                </a>
              </td>
              <td>
                <button
                  className="delete-btn"
                  onClick={() => deleteRecording(r._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>

  </div>
)}
         {/* LEADS */}
{activeTab === "leads" && (
  <>
    <h3>Leads (Payment Pending)</h3>

    <div className="student-filters">
      <select
        value={filter.class}
        onChange={(e) =>
          setFilter({ ...filter, class: e.target.value })
        }
      >
        <option value="">All Class</option>
        <option value="10">10</option>
        <option value="11">11</option>
        <option value="12">12</option>
        <option value="MHT-CET">MHT-CET</option>
      </select>

      <select
        value={filter.board}
        onChange={(e) =>
          setFilter({ ...filter, board: e.target.value })
        }
      >
        <option value="">All Board</option>
        <option value="CBSE">CBSE</option>
        <option value="Maharashtra">Maharashtra</option>
      </select>

      <select
        value={filter.courseType}
        onChange={(e) =>
          setFilter({ ...filter, courseType: e.target.value })
        }
      >
        <option value="">All Course</option>
        <option value="Crash">Crash</option>
        <option value="Regular">Regular</option>
      </select>
    </div>

    {loadingLeads ? (
      <p>Loading...</p>
    ) : leads.length === 0 ? (
      <p style={{ marginTop: 20 }}>No leads found</p>
    ) : (
      <table className="student-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Class</th>
            <th>Board</th>
            <th>Course</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((l) => (
            <tr key={l._id}>
              <td>{l.name}</td>
              <td>{l.email}</td>
              <td>{l.phone}</td>
              <td>{l.class}</td>
              <td>{l.board}</td>
              <td>{l.courseType}</td>
              <td style={{ color: "#dc2626", fontWeight: 600 }}>
                Payment Pending
              </td>
               {/* 👇 YAHI DELETE BUTTON */}
    <td>
      <button
        className="delete-btn"
        onClick={() => deleteStudent(l._id)}
      >
        Delete
      </button>
    </td>
            </tr>
          ))}
        </tbody>
      </table>
    )}
  </>
)} 
{/* ================= ADD USER ================= */}
{activeTab === "addUser" && (
  <div>
    <h3>Add Admin User</h3>

    {/* ADD ADMIN FORM */}
    <div className="form-box">
      <input
        type="text"
        placeholder="Name"
        value={adminForm.name}
        onChange={(e) =>
          setAdminForm({ ...adminForm, name: e.target.value })
        }
      />

      <input
        type="email"
        placeholder="Email"
        value={adminForm.email}
        onChange={(e) =>
          setAdminForm({ ...adminForm, email: e.target.value })
        }
      />

      <input
        type="password"
        placeholder="Password"
        value={adminForm.password}
        onChange={(e) =>
          setAdminForm({ ...adminForm, password: e.target.value })
        }
      />

      <button className="primary-btn" onClick={createAdmin}>
        Add Admin
      </button>
    </div>

    {/* ADMIN LIST */}
    <h3 style={{ marginTop: 20 }}>Admin Users</h3>

    <table className="data-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {admins.length === 0 ? (
          <tr>
            <td colSpan="3">No admins found</td>
          </tr>
        ) : (
          admins.map((a) => (
            <tr key={a._id}>
              <td>{a.name}</td>
              <td>{a.email}</td>
              <td>
                <button
                  className="danger-btn"
                  onClick={() => deleteAdmin(a._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  </div>
)}
        </div>
      </div>

      {/* ================= MODAL ================= */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Create Live Class</h3>

            <select name="class" value={form.class} onChange={handleChange}>
              <option value="" disabled>
                Select Class
              </option>
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>
              <option value="MHT-CET">MHT-CET</option>
            </select>

            <select name="board" value={form.board} onChange={handleChange}>
              <option value="" disabled>
                Select Board
              </option>
              <option value="CBSE">CBSE</option>
              <option value="Maharashtra">Maharashtra</option>
            </select>

            <select
              name="courseType"
              value={form.courseType}
              onChange={handleChange}
            >
              <option value="" disabled>
                Select Course
              </option>
              <option value="Crash">Crash</option>
              <option value="Regular">Regular</option>
            </select>

            <input
              name="joinLink"
              placeholder="Zoom / Meet link"
              onChange={handleChange}
            />

            <input
              type="datetime-local"
              name="startTime"
              onChange={handleChange}
            />
            <input
              type="datetime-local"
              name="endTime"
              onChange={handleChange}
            />

            <div className="modal-actions">
              <button onClick={submitLiveClass}>Create</button>
              <button
                className="cancel"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}