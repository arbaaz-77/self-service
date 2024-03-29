"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

const TicketForm = ({ ticket }) => {
  const router = useRouter();

  const EDITMODE = ticket._id === "new" ? false : true;

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (EDITMODE) {
      const res = await fetch(`/api/Tickets/${ticket._id}`, {
        method: "PUT",
        body: JSON.stringify({ formData }),
        "content-type": "application/json",
      });

      if (!res.ok) {
        throw new Error("failed to update ticket.");
      }
    } else {
      const res = await fetch("/api/Tickets", {
        method: "POST",
        body: JSON.stringify({ formData }),
        "content-type": "application/json",
      });

      if (!res.ok) {
        throw new Error("failed to create ticket.");
      }
    }

    router.push("/");
    router.refresh();
  };

  const startingTicketData = {
    title: "",
    description: "",
    priority: 1,
    progress: 0,
    status: "not started",
    category: "Connectivity",
  };

  if (EDITMODE) {
    startingTicketData["title"] = ticket.title;
    startingTicketData["description"] = ticket.description;
    startingTicketData["priority"] = ticket.priority;
    startingTicketData["progress"] = ticket.progress;
    startingTicketData["status"] = ticket.status;
    startingTicketData["category"] = ticket.category;
  }

  const [formData, setFormData] = useState(startingTicketData);

  return (
    <div className="flex justify-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 w-1/2"
        method="post"
      >
        {/* Header */}
        <h3>{EDITMODE ? "Update Your Ticket" : "Create Your Ticket"}</h3>

        {/* title */}
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          id="title"
          onChange={handleChange}
          required={true}
          value={formData.title}
        />

        {/* Desc */}
        <label htmlFor="description">Description</label>
        <textarea
          type="text"
          name="description"
          id="description"
          onChange={handleChange}
          required={true}
          value={formData.description}
          rows="5"
        />

        {/* Category */}
        <label htmlFor="category">Category</label>
        <select
          name="category"
          value={formData.category}
          id="category"
          onChange={handleChange}
        >
          <option value="Hardware">Hardware</option>
          <option value="Connectivity">Connectivity</option>
          <option value="Purchasing">Purchasing</option>
          <option value="Warranty">Warranty Claim</option>
        </select>

        {/* Priority */}
        <label htmlFor="priority">Priority</label>
        <div className="">
          <input
            type="radio"
            id="priority 1"
            name="priority"
            onChange={handleChange}
            value={1}
            checked={formData.priority == 1}
          />
          <label>1</label>
          <input
            type="radio"
            id="priority 2"
            name="priority"
            onChange={handleChange}
            value={2}
            checked={formData.priority == 2}
          />
          <label>2</label>
          <input
            type="radio"
            id="priority 3"
            name="priority"
            onChange={handleChange}
            value={3}
            checked={formData.priority == 3}
          />
          <label>3</label>
          <input
            type="radio"
            id="priority 4"
            name="priority"
            onChange={handleChange}
            value={4}
            checked={formData.priority == 4}
          />
          <label>4</label>
          <input
            type="radio"
            id="priority 5"
            name="priority"
            onChange={handleChange}
            value={5}
            checked={formData.priority == 5}
          />
          <label>5</label>
        </div>

        {/* Progress */}
        <label htmlFor="progress">Progress</label>
        <input
          type="range"
          name="progress"
          id="progress"
          value={formData.progress}
          min="0"
          max="100"
          onChange={handleChange}
        />

        {/* Status */}
        <label htmlFor="status">Status</label>
        <select
          name="status"
          id="status"
          value={formData.status}
          onChange={handleChange}
        >
          <option value="Not Started">Not Started</option>
          <option value="Started">Started</option>
          <option value="Done">Done</option>
        </select>

        {/* Submit */}
        <input
          type="submit"
          className="btn max-w-xs self-center"
          value={EDITMODE ? "update ticket" : "create ticket"}
        />
      </form>
    </div>
  );
};

export default TicketForm;
