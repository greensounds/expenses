'use client';
import Login from "@/components/Login";
import SubscriptionForm from "@/components/SubscriptionForm";
import Summary from "@/components/Summary";
import SubscriptionsDisplay from "@/components/SubscriptionsDisplay";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";

const blankSub = {
  name: "",
  category: "Entertainment",
  cost: "",
  currency: "MXN",
  billingFrequency: "Monthly",
  nextBillingData: "Credit Card",
  startDate: "",
  renewalType: "",
  notes: "",
  status: "Active"
}

export default function Dashboard() {
  const [isAddEntry, setIsAddEntry] = useState(false);
  const [formData, setFormData] = useState(blankSub)

  const { handleDeleteSubscription, userData, currentUser, loading } = useAuth()
  const isAuth = !!currentUser;

  const handleChangeInput = (e) => {
    const newData = {
      ...formData,
      [e.target.name]: e.target.value
    }

    setFormData(newData)
  }

  const handleEditSubscription = (index) => {
    const data = userData.subscriptions.find((val, valIndex) => {
      return valIndex === index
    })
    setFormData(data)
    handleDeleteSubscription(index)
    setIsAddEntry(true)
  }

  const handleResetSub = () => {
    setFormData(blankSub)
  }

  const handleToggleInput = () => {
    setIsAddEntry(!isAddEntry)
  }

  if(loading) {
    return (
      <p>Loading...</p>
    )
  }

  if(!isAuth) {
    return (
      <Login />
    )
  }

  return (
    <>
      <Summary />
      <SubscriptionsDisplay handleEditSubscription={handleEditSubscription} handleShowInput={isAddEntry ? () => {} : handleToggleInput } />
      { isAddEntry && (
        <SubscriptionForm handleResetSub={handleResetSub} closeInput={handleToggleInput} formData={formData} handleChangeInput={handleChangeInput} />
      )}
    </>
  );
}
