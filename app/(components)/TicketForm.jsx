"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

const TicketForm = () => {
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const startingTicketData = {
    title: "",
    description: "",
    priority: 1,
    progress: 0,
    status: "not started",
    category: "Connectivity",
  };

  const [formData, setFormData] = useState(startingTicketData);

  return (
    <div className="flex justify-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 w-1/2"
        method="post"
      >
        {/* Header */}
        <h3>Create Your Ticket</h3>

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
          <option value="hardware">Hardware</option>
          <option value="connectivity">Connectivity</option>
          <option value="purchasing">Purchasing</option>
          <option value="warranty">Warranty Claim</option>
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
          <option value="not started">Not Started</option>
          <option value="started">Started</option>
          <option value="done">Done</option>
        </select>

        {/* Submit */}
        <input
          type="submit"
          className="btn max-w-xs self-center"
          value="create ticket"
        />
      </form>
    </div>
  );
};

export default TicketForm;
