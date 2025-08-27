'use client';

import { useAuth } from "@/context/AuthContext";
import { useState } from "react";

const SubscriptionForm = ({ handleResetSub, closeInput, formData, handleChangeInput }) => {
  const { handleAddSubscription } = useAuth()
  const handleFormSubmit = (e) => {
    e.preventDefault()
    handleAddSubscription(formData)
    handleResetSub()
    closeInput()
  }

  return (
    <section>
      <h2>Add a new subscription</h2>
      <form onSubmit={handleFormSubmit}>
        <label>
          <span>Susbcription Name</span>
          <input value={formData.name} onChange={handleChangeInput} type="text" name="name" placeholder="e.g Netflix, Youtube" required />
        </label>

         <label>
          <span>Category</span>
          <select value={formData.category} onChange={handleChangeInput} name="category">
            {['Entertainment', 'Music', 'Software', 'Health', 'Other'].map((cat, catIndex) => (
              <option key={catIndex}>{cat}</option>
            ))}
          </select>
        </label>

        <label>
          <span>Cost</span>
          <input value={formData.cost} onChange={handleChangeInput} type="number" name="cost" step="0.01" placeholder="12.00" required/>
        </label>

        <label>
          <span>Currency</span>
          <select value={formData.currency} onChange={handleChangeInput} name="currency">
            {['USD', 'EUR', 'GBP', 'MXN', 'Other'].map((cur, curIndex) => (
              <option key={curIndex}>{cur}</option>
            ))}
          </select>
        </label>

         <label>
          <span>Billing Frequency</span>
          <select value={formData.billingFrequency} onChange={handleChangeInput} name="billingFrequency">
            {['Monthly', 'Yearly', 'One-time'].map((bf, bfIndex) => (
              <option key={bfIndex}>{bf}</option>
            ))}
          </select>
        </label>

        <label>
          <span>Payment Method</span>
          <select value={formData.paymentMethod} onChange={handleChangeInput} name="paymentMethod">
            {['Credit Card', 'Debit Card', 'Paypal', 'Cash', 'Other'].map((payment, paymentIndex) => (
              <option key={paymentIndex}>{payment}</option>
            ))}
          </select>
        </label>

        <label>
          <span>Subscription Start Date</span>
          <input value={formData.startDate} onChange={handleChangeInput} type="date" name="startDate" required />
        </label>

        <label>
          <span>Status</span>
          <select value={formData.status} onChange={handleChangeInput} name="status">
            {['Active', 'Paused', 'Cancelled'].map((status, statusIndex) => (
              <option key={statusIndex}>{status}</option>
            ))}
          </select>
        </label>

        <label className="fat-column">
          <span>Notes</span>
          <textarea value={formData.notes} onChange={handleChangeInput} name="notes" placeholder="Shared with family..." />
        </label>

        <div className="fat-column form-submit-btns">
          <button onClick={closeInput}>Cancel</button>
          <button type="submit">Add subscription</button>
        </div>
      </form>
    </section>
  )
}

export default SubscriptionForm
