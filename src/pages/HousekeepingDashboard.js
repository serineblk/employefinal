// HousekeepingDashboard.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { FaTasks, FaClipboardList, FaShoppingCart, FaUserCheck, FaCheck, FaPlus } from "react-icons/fa";
import profilefemmenage from "../assets/profilefemmemenage.webp";
import "../Style/housekeeping.css";

const HousekeepingDashboard = () => {
  const navigate = useNavigate();
  const [activeButton, setActiveButton] = useState("Tâches de Ménage");
  const [tasks, setTasks] = useState([]);
  const [specialRequests, setSpecialRequests] = useState([]);
  const [inventoryOrders, setInventoryOrders] = useState([]);
  const [staff, setStaff] = useState([]);
  const [newTask, setNewTask] = useState({ room: "", status: "" });
  const [newRequest, setNewRequest] = useState({ room: "", request: "" });
  const [newOrder, setNewOrder] = useState({ product: "", quantity: "", date: "" });
  const [newEmployee, setNewEmployee] = useState({ name: "", status: "", performance: "" });

  useEffect(() => {
  
    
    const fetchTasks = async () => {
      try {
        
        const response = await axios.get('/api/housekeeping/tasks');
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
        setTasks([]); // Fallback: initialise avec un tableau vide
      }
    };
  
    const fetchSpecialRequests = async () => {
      try {
        const response = await axios.get('/api/special-requests/requests');
        setSpecialRequests(response.data);
      } catch (error) {
        console.error('Error fetching special requests:', error);
        setSpecialRequests([]);
      }
    };
  
    const fetchInventoryOrders = async () => {
      try {
        const response = await axios.get('/api/inventory/orders');
        setInventoryOrders(response.data);
      } catch (error) {
        console.error('Error fetching inventory orders:', error);
        setInventoryOrders([]);
      }
    };
  
    const fetchStaff = async () => {
      try {
        const response = await axios.get('/api/staff/staff');
        setStaff(response.data);
      } catch (error) {
        console.error('Error fetching staff:', error);
        setStaff([]);
      }
    };
  
    fetchTasks();
    fetchSpecialRequests();
    fetchInventoryOrders();
    fetchStaff();
  }, []);

  const updateTaskStatus = async (taskId, newStatus) => {
    await axios.put(`/api/housekeeping/tasks/${taskId}`, { status: newStatus });

    setTasks(tasks.map(task => task.id === taskId ? { ...task, status: newStatus } : task));
  };

  const addTask = async () => {
    if (newTask.room && newTask.status) {
      await axios.post('/api/housekeeping/tasks', newTask);
      setTasks([...tasks, { ...newTask, id: tasks.length + 1 }]);
      setNewTask({ room: "", status: "" });
    } else {
      alert("Veuillez remplir tous les champs.");
    }
  };

  const addSpecialRequest = async () => {
    if (newRequest.room && newRequest.request) {
      await axios.post('/api/special-requests/requests', newRequest);
      setSpecialRequests([...specialRequests, { ...newRequest, id: specialRequests.length + 1 }]);
      setNewRequest({ room: "", request: "" });
    } else {
      alert("Veuillez remplir tous les champs.");
    }
  };

  const addInventoryOrder = async () => {
    if (newOrder.product && newOrder.quantity && newOrder.date) {
      await axios.post('/api/inventory/orders', newOrder);
      setInventoryOrders([...inventoryOrders, { ...newOrder, id: inventoryOrders.length + 1 }]);
      setNewOrder({ product: "", quantity: "", date: "" });
    } else {
      alert("Veuillez remplir tous les champs.");
    }
  };

  const addEmployee = async () => {
    if (newEmployee.name && newEmployee.status && newEmployee.performance) {
      await axios.post('/api/staff/staff', newEmployee);
      setStaff([...staff, { ...newEmployee, id: staff.length + 1 }]);
      setNewEmployee({ name: "", status: "", performance: "" });
    } else {
      alert("Veuillez remplir tous les champs.");
    }
  };

  const buttons = [
    { name: "Tâches de Ménage", icon: <FaTasks /> },
    { name: "Demandes Spéciales", icon: <FaClipboardList /> },
    { name: "Commande des Produits", icon: <FaShoppingCart /> },
    { name: "Suivi du Personnel", icon: <FaUserCheck /> },
  ];

  const handleLogout = () => {
    alert("Déconnexion réussie !");
    navigate("/");
  };

  return (
    <div className="container">
      <Sidebar
        buttons={buttons}
        onButtonClick={setActiveButton}
        activeButton={activeButton}
        onLogout={handleLogout}
        dashboardName="Contrôle Propre"
        profileImage={profilefemmenage}
      />
      <div className="main-content">
        {activeButton === "Tâches de Ménage" && (
          <section className="section">
            <h2 className="heading">Tâches de Ménage</h2>
            <table className="table">
              <thead>
                <tr>
                  <th>ID de la chambre</th>
                  <th>Statut</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task) => (
                  <tr key={task.id}>
                    <td>{task.room}</td>
                    <td>{task.status}</td>
                    <td>
                      <button className="button" onClick={() => updateTaskStatus(task.id, "propre")}>
                        <FaCheck /> Marquer comme propre
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="form">
              <input
                type="text"
                placeholder="ID de la chambre"
                value={newTask.room}
                onChange={(e) => setNewTask({ ...newTask, room: e.target.value })}
                className="input"
              />
              <select
                value={newTask.status}
                onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
                className="input"
              >
                <option value="">Choisir un statut</option>
                <option value="à nettoyer">À nettoyer</option>
                <option value="en maintenance">En maintenance</option>
                <option value="utilisé">Utilisé</option>
              </select>
              <button className="button" onClick={addTask}>
                <FaPlus /> Ajouter une tâche
              </button>
            </div>
          </section>
        )}

        {activeButton === "Demandes Spéciales" && (
          <section className="section">
            <h2 className="heading">Demandes Spéciales</h2>
            <table className="table">
              <thead>
                <tr>
                  <th>ID de la chambre</th>
                  <th>Demande</th>
                  <th>Statut</th>
                </tr>
              </thead>
              <tbody>
                {specialRequests.map((request) => (
                  <tr key={request.id}>
                    <td>{request.room}</td>
                    <td>{request.request}</td>
                    <td>{request.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="form">
              <input
                type="text"
                placeholder="ID de la chambre"
                value={newRequest.room}
                onChange={(e) => setNewRequest({ ...newRequest, room: e.target.value })}
                className="input"
              />
              <input
                type="text"
                placeholder="Demande"
                value={newRequest.request}
                onChange={(e) => setNewRequest({ ...newRequest, request: e.target.value })}
                className="input"
              />
              <button className="button" onClick={addSpecialRequest}>
                <FaPlus /> Ajouter une demande
              </button>
            </div>
          </section>
        )}

        {activeButton === "Commande des Produits" && (
          <section className="section">
            <h2 className="heading">Commande des Produits</h2>
            <table className="table">
              <thead>
                <tr>
                  <th>Produit</th>
                  <th>Quantité</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {inventoryOrders.map((order) => (
                  <tr key={order.id}>
                    <td>{order.product}</td>
                    <td>{order.quantity}</td>
                    <td>{order.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="form">
              <input
                type="text"
                placeholder="Nom du produit"
                value={newOrder.product}
                onChange={(e) => setNewOrder({ ...newOrder, product: e.target.value })}
                className="input"
              />
              <input
                type="number"
                placeholder="Quantité"
                value={newOrder.quantity}
                onChange={(e) => setNewOrder({ ...newOrder, quantity: e.target.value })}
                className="input"
              />
              <input
                type="date"
                placeholder="Date"
                value={newOrder.date}
                onChange={(e) => setNewOrder({ ...newOrder, date: e.target.value })}
                className="input"
              />
              <button className="button" onClick={addInventoryOrder}>
                <FaPlus /> Ajouter une commande
              </button>
            </div>
          </section>
        )}

        {activeButton === "Suivi du Personnel" && (
          <section className="section">
            <h2 className="heading">Suivi du Personnel</h2>
            <table className="table">
              <thead>
                <tr>
                  <th>Nom</th>
                  <th>Statut</th>
                  <th>Performance</th>
                </tr>
              </thead>
              <tbody>
                {staff.map((employee) => (
                  <tr key={employee.id}>
                    <td>{employee.name}</td>
                    <td>{employee.status}</td>
                    <td>{employee.performance}/10</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="form">
              <input
                type="text"
                placeholder="Nom de l'employé"
                value={newEmployee.name}
                onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
                className="input"
              />
              <select
                value={newEmployee.status}
                onChange={(e) => setNewEmployee({ ...newEmployee, status: e.target.value })}
                className="input"
              >
                <option value="">Choisir un statut</option>
                <option value="présent">Présent</option>
                <option value="absent">Absent</option>
              </select>
              <input
                type="number"
                placeholder="Performance/10"
                value={newEmployee.performance}
                onChange={(e) => setNewEmployee({ ...newEmployee, performance: e.target.value })}
                className="input"
              />
              <button className="button" onClick={addEmployee}>
                <FaPlus /> Ajouter un employé
              </button>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default HousekeepingDashboard;