import React from "react";
import HomePage from "./pages/Home";
import MainLayout from "./components/Layout";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { RoleAnalytics, Summary, Individual, Question } from "./pages/RoleAnalytics";
import Release_Openings from "./pages/ReleaseOpenings/ReleaseOpenings.jsx"
import NewOpeningForm from "./pages/ReleaseOpenings/NewOpeningForm.jsx";
import OpeningsDetailedForm from "./pages/ReleaseOpenings/OpeningsDetailedForm.jsx"

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<MainLayout />}>
                    <Route path="/" element={<HomePage />} />

                    <Route path="/release_openings" element={<Release_Openings />} />
                    <Route path="/new_opening_form" element={<NewOpeningForm />} />
                    <Route path="/opening_form_details" element={<OpeningsDetailedForm />} />

                    <Route path="/role_analytics" element={<RoleAnalytics />}>
                        <Route index element={<Navigate to="summary" replace />} />
                        <Route path="summary" element={<Summary />} />
                        <Route path="question" element={<Question />} />
                        <Route path="individual" element={<Individual />} />
                    </Route>

                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default App;
