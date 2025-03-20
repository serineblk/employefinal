import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../Style/ServiceDetailsPage.css"; // Fichier CSS pour les styles
import SteakFritesImage from "../assets/Steak Frites.webp";
import PatesCarbonaraImage from "../assets/Pâtes Carbonara.webp";
import SaladeCesarImage from "../assets/Salade César.webp";
import BurgerGourmetImage from "../assets/Burger Gourmet.webp";
import PizzaMargheritaImage from "../assets/Pizza Margherita.webp";
import SushiMixImage from "../assets/Sushi Mix.webp";
import TiramisuImage from "../assets/Tiramisu.webp";
import CremeBruleeImage from "../assets/Crème Brûlée.webp";
import GymImage from "../assets/gym2.webp";
import MassageImage from "../assets/massage.webp";
import MusculationImage from "../assets/Musculation.webp";
import DoctorImage from "../assets/doctor.webp";
import FeuImage from "../assets/feu.webp";
import SecuriseImage from "../assets/securise.webp";
import SoinDesPiedsImage from "../assets/soin des pieds.webp";
import VisageSoinImage from "../assets/visage soign.webp";

// Composant RestaurantCard pour serviceId === 1
const RestaurantCard = () => {
  const [menu, setMenu] = useState([
    {
      id: 1,
      name: "Steak Frites",
      description: "Steak juteux accompagné de frites croustillantes.",
      price: 18,
      ingredients: ["Steak", "Frites", "Beurre", "Herbes"],
      rating: 4.7,
      ratings: [5, 4, 5, 4, 5],
      image: SteakFritesImage,
    },
    {
      id: 2,
      name: "Pâtes Carbonara",
      description: "Pâtes crémeuses avec lardons et parmesan.",
      price: 14,
      ingredients: ["Pâtes", "Lardons", "Crème", "Parmesan"],
      rating: 4.5,
      ratings: [4, 5, 4, 5, 4],
      image: PatesCarbonaraImage,
    },
    {
      id: 3,
      name: "Salade César",
      description: "Salade fraîche avec poulet grillé, croûtons et sauce césar.",
      price: 12,
      ingredients: ["Laitue", "Poulet", "Croûtons", "Sauce César"],
      rating: 4.3,
      ratings: [4, 4, 5, 4, 4],
      image: SaladeCesarImage,
    },
    {
      id: 4,
      name: "Burger Gourmet",
      description: "Burger avec steak haché, cheddar, bacon et sauce maison.",
      price: 16,
      ingredients: ["Steak haché", "Cheddar", "Bacon", "Sauce maison"],
      rating: 4.6,
      ratings: [5, 4, 5, 4, 5],
      image: BurgerGourmetImage,
    },
    {
      id: 5,
      name: "Pizza Margherita",
      description: "Pizza classique avec tomate, mozzarella et basilic.",
      price: 13,
      ingredients: ["Tomate", "Mozzarella", "Basilic"],
      rating: 4.4,
      ratings: [4, 5, 4, 5, 4],
      image: PizzaMargheritaImage,
    },
    {
      id: 6,
      name: "Sushi Mix",
      description: "Assortiment de sushis frais (saumon, thon, crevette).",
      price: 22,
      ingredients: ["Riz", "Saumon", "Thon", "Crevette"],
      rating: 4.8,
      ratings: [5, 5, 4, 5, 5],
      image: SushiMixImage,
    },
    {
      id: 7,
      name: "Tiramisu",
      description: "Dessert italien au café et mascarpone.",
      price: 8,
      ingredients: ["Mascarpone", "Café", "Biscuits", "Cacao"],
      rating: 4.9,
      ratings: [5, 5, 5, 5, 5],
      image: TiramisuImage,
    },
    {
      id: 8,
      name: "Crème Brûlée",
      description: "Crème onctueuse avec une couche de sucre caramélisé.",
      price: 9,
      ingredients: ["Crème", "Sucre", "Vanille"],
      rating: 4.7,
      ratings: [5, 4, 5, 4, 5],
      image: CremeBruleeImage,
    },
  ]);

  const [selectedDish, setSelectedDish] = useState(null);
  const [clientRating, setClientRating] = useState(0);
  const [showAddDishForm, setShowAddDishForm] = useState(false);
  const [newDish, setNewDish] = useState({
    name: "",
    description: "",
    price: 0,
    ingredients: [],
    image: null,
  });

  const validateOrder = (dish) => {
    alert(`Vous avez commandé : ${dish.name}`);
    setSelectedDish(null);
  };

  const closeModal = () => {
    setSelectedDish(null);
    setClientRating(0);
  };

  const submitRating = (dishId) => {
    if (clientRating > 0) {
      const updatedMenu = menu.map((dish) =>
        dish.id === dishId
          ? {
              ...dish,
              ratings: [...dish.ratings, clientRating],
              rating:
                [...dish.ratings, clientRating].reduce((a, b) => a + b, 0) /
                [...dish.ratings, clientRating].length,
            }
          : dish
      );
      setMenu(updatedMenu);
      setClientRating(0);
      alert("Merci pour votre note !");
    } else {
      alert("Veuillez sélectionner une note avant de soumettre.");
    }
  };

  const handleAddDish = () => {
    setShowAddDishForm(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewDish({
      ...newDish,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    setNewDish({
      ...newDish,
      image: URL.createObjectURL(e.target.files[0]),
    });
  };

  const handleIngredientsChange = (e) => {
    setNewDish({
      ...newDish,
      ingredients: e.target.value.split(","),
    });
  };

  const submitNewDish = () => {
    const dishToAdd = {
      id: menu.length + 1,
      name: newDish.name,
      description: newDish.description,
      price: parseFloat(newDish.price),
      ingredients: newDish.ingredients,
      rating: 0,
      ratings: [],
      image: newDish.image,
    };

    setMenu([...menu, dishToAdd]);
    setShowAddDishForm(false);
    setNewDish({
      name: "",
      description: "",
      price: 0,
      ingredients: [],
      image: null,
    });
  };

  return (
    <div className="restaurant-card-container">
      <button className="add-dish-button" onClick={handleAddDish}>
        Ajouter un plat
      </button>

      {showAddDishForm && (
        <div className="add-dish-form">
          <h3>Ajouter un nouveau plat</h3>
          <input
            type="text"
            name="name"
            placeholder="Nom du plat"
            value={newDish.name}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={newDish.description}
            onChange={handleInputChange}
          />
          <input
            type="number"
            name="price"
            placeholder="Prix"
            value={newDish.price}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="ingredients"
            placeholder="Ingrédients (séparés par des virgules)"
            value={newDish.ingredients.join(",")}
            onChange={handleIngredientsChange}
          />
          <input
            type="file"
            name="image"
            onChange={handleImageChange}
          />
          <button onClick={submitNewDish}>Ajouter</button>
          <button onClick={() => setShowAddDishForm(false)}>Annuler</button>
        </div>
      )}

      <div className="menu-grid">
        {menu.map((dish) => (
          <div
            key={dish.id}
            className="card"
            onClick={() => setSelectedDish(dish)}
          >
            <img src={dish.image} alt={dish.name} className="dish-image" />
            <h3>{dish.name}</h3>
            <p>{dish.description}</p>
            <p><strong>Prix :</strong> {dish.price}€</p>
            <p><strong>Note :</strong> {dish.rating.toFixed(1)}/5</p>
          </div>
        ))}
      </div>

      {selectedDish && (
        <div className="modal">
          <div className="modal-content">
            <img
              src={selectedDish.image}
              alt={selectedDish.name}
              className="dish-image"
            />
            <h3>{selectedDish.name}</h3>
            <p>{selectedDish.description}</p>
            <p><strong>Prix :</strong> {selectedDish.price}€</p>
            <p><strong>Ingrédients :</strong> {selectedDish.ingredients.join(", ")}</p>
            <p><strong>Note moyenne :</strong> {selectedDish.rating.toFixed(1)}/5</p>
            <div className="rating-section">
              <h4>Donnez votre avis :</h4>
              <div className="rating-stars">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={star <= clientRating ? "active" : ""}
                    onClick={() => setClientRating(star)}
                  >
                    ★
                  </span>
                ))}
              </div>
              <button className="submit-rating" onClick={() => submitRating(selectedDish.id)}>
                Soumettre la note
              </button>
            </div>
            <button className="validate-order" onClick={() => validateOrder(selectedDish)}>
              Commander
            </button>
            <button className="close-modal" onClick={closeModal}>
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Composant GymServices pour serviceId === 2
const GymServices = () => {
  const gymServices = [
    {
      id: 1,
      name: "Cardio Training",
      price: "30€",
      hours: "6h - 22h",
      team: "Équipe Fitness",
      description: "Séances de cardio pour améliorer votre endurance.",
      image: GymImage,
    },
    {
      id: 2,
      name: "Musculation",
      price: "40€",
      hours: "7h - 21h",
      team: "Équipe Bodybuilding",
      description: "Exercices de musculation pour renforcer vos muscles.",
      image: MusculationImage,
    },
    {
      id: 3,
      name: "Yoga",
      price: "35€",
      hours: "8h - 20h",
      team: "Équipe Relaxation",
      description: "Séances de yoga pour améliorer votre flexibilité et votre bien-être.",
      image: MassageImage,
    },
  ];

  const [selectedService, setSelectedService] = useState(null);

  const closeModal = () => {
    setSelectedService(null);
  };

  const validateService = () => {
    alert(`Service validé : ${selectedService.name}`);
    closeModal();
  };

  const joinUs = (serviceName) => {
    alert(`Vous avez rejoint le service : ${serviceName}`);
  };

  return (
    <div>
      <div className="gym-services-container">
        {gymServices.map((service) => (
          <div
            key={service.id}
            className="gym-card"
            onClick={() => setSelectedService(service)}
          >
            <img
              src={service.image}
              alt={service.name}
              className="gym-card-image"
            />
            <h3>{service.name}</h3>
            <p>Prix : {service.price}</p>
            <p>Heures : {service.hours}</p>
            <p>Équipe : {service.team}</p>
            <button
              className="join-button"
              onClick={(e) => {
                e.stopPropagation();
                joinUs(service.name);
              }}
            >
              Rejoins-nous !
            </button>
          </div>
        ))}
      </div>

      {selectedService && (
        <div className="modal">
          <div className="modal-content">
            <img
              src={selectedService.image}
              alt={selectedService.name}
              style={{ width: "100%", borderRadius: "10px", marginBottom: "10px" }}
            />
            <h3>Détails du Service : {selectedService.name}</h3>
            <p>{selectedService.description}</p>
            <p>Prix : {selectedService.price}</p>
            <p>Heures : {selectedService.hours}</p>
            <p>Équipe : {selectedService.team}</p>
            <button
              className="validate"
              onClick={validateService}
            >
              Valider
            </button>
            <button
              className="close"
              onClick={closeModal}
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const SpaEmergencyService = () => {
  const spaServices = [
    {
      id: 1,
      name: "Massage",
      price: "70€",
      hours: "10h - 20h",
      team: "Équipe Bien-être",
      description: "Massage relaxant pour détendre vos muscles.",
      image: MassageImage,
    },
    {
      id: 2,
      name: "Soins du Visage",
      price: "50€",
      hours: "9h - 18h",
      team: "Équipe Beauté",
      description: "Soins hydratants et anti-âge pour votre visage.",
      image: VisageSoinImage,
    },
    {
      id: 3,
      name: "Soins des Pieds",
      price: "40€",
      hours: "11h - 19h",
      team: "Équipe Podologie",
      description: "Pédicure et soins des pieds pour un confort optimal.",
      image: SoinDesPiedsImage,
    },
  ];

  const [selectedService, setSelectedService] = useState(null);

  const closeModal = () => {
    setSelectedService(null);
  };

  const validateService = () => {
    alert(`Service validé : ${selectedService.name}`);
    closeModal();
  };

  return (
    <div>
   
      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        {spaServices.map((service) => (
          <div
            key={service.id}
            className="spa-card"
            onClick={() => setSelectedService(service)}
          >
            <div className="icon">
              
            </div>
            <img
              src={service.image}
              alt={service.name}
              style={{ width: "100%", borderRadius: "10px", marginBottom: "10px" }}
            />
            <h3>{service.name}</h3>
            <p>Prix : {service.price}</p>
            <p>Heures : {service.hours}</p>
            <p>Équipe : {service.team}</p>
          </div>
        ))}
      </div>

      {selectedService && (
        <div className="modal">
          <div className="modal-content">
            <img
              src={selectedService.image}
              alt={selectedService.name}
              style={{ width: "100%", borderRadius: "10px", marginBottom: "10px" }}
            />
            <h3>Détails du Service : {selectedService.name}</h3>
            <p>{selectedService.description}</p>
            <p>Prix : {selectedService.price}</p>
            <p>Heures : {selectedService.hours}</p>
            <p>Équipe : {selectedService.team}</p>
            <button className="validate" onClick={validateService}>
              Valider
            </button>
            <button className="close" onClick={closeModal}>
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  );
};


const EmergencyService = () => {
  const emergencyServices = [
    {
      id: 1,
      name: "Appeler un Docteur",
      description: "Contactez un médecin en cas d'urgence médicale.",
      image: DoctorImage,
    },
    {
      id: 2,
      name: "Signaler un Feu",
      description: "Signalez un incendie dans votre chambre ou ailleurs.",
      image: FeuImage,
    },
    {
      id: 3,
      name: "Appeler la Sécurité",
      description: "Contactez la sécurité en cas de problème.",
      image: SecuriseImage,
    },
  ];

  const [selectedService, setSelectedService] = useState(null);

  const closeModal = () => {
    setSelectedService(null);
  };

  const validateService = () => {
    alert(`Service validé : ${selectedService.name}`);
    closeModal();
  };

  return (
    <div>
      
      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        {emergencyServices.map((service) => (
          <div
            key={service.id}
            className="emergency-card"
            onClick={() => setSelectedService(service)}
          >
            <div className="icon">
             
            </div>
            <img
              src={service.image}
              alt={service.name}
              style={{ width: "100%", borderRadius: "10px", marginBottom: "10px" }}
            />
            <h3>{service.name}</h3>
            <p>{service.description}</p>
          </div>
        ))}
      </div>

      {selectedService && (
        <div className="modal">
          <div className="modal-content">
            <img
              src={selectedService.image}
              alt={selectedService.name}
              style={{ width: "100%", borderRadius: "10px", marginBottom: "10px" }}
            />
            <h3>Détails du Service : {selectedService.name}</h3>
            <p>{selectedService.description}</p>
            <button className="validate" onClick={validateService}>
              Valider
            </button>
            <button className="close" onClick={closeModal}>
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const RoomService = () => {
  const [orders, setOrders] = useState([]);
  const [newOrder, setNewOrder] = useState("");
  const [deliveredOrders, setDeliveredOrders] = useState([]);
  const [customerFeedback, setCustomerFeedback] = useState("");

  const addOrder = () => {
    if (newOrder.trim() !== "") {
      const order = {
        id: orders.length + 1,
        details: newOrder,
        status: "En préparation",
      };
      setOrders([...orders, order]);
      setNewOrder("");
    }
  };

  const markAsDelivered = (id) => {
    const order = orders.find((order) => order.id === id);
    if (order) {
      setDeliveredOrders([...deliveredOrders, order]);
      setOrders(orders.filter((order) => order.id !== id));
    }
  };

  const sendFeedback = () => {
    if (customerFeedback.trim() !== "") {
      alert(`Feedback envoyé : ${customerFeedback}`);
      setCustomerFeedback("");
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      
      <div className="room-service-card">
        <div className="icon">
          
        </div>
        <h2>Prise de Commandes</h2>
        <input
          type="text"
          value={newOrder}
          onChange={(e) => setNewOrder(e.target.value)}
          placeholder="Entrez la commande (plat, boisson, etc.)"
          style={{ padding: "8px", width: "300px", marginRight: "10px" }}
        />
        <button
          onClick={addOrder}
          style={{
            padding: "8px 16px",
            backgroundColor: "#3498db",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Ajouter la Commande
        </button>
      </div>

      {/* Section : Préparation et Livraison des Commandes */}
      <div style={{ marginBottom: "30px" }}>
        <h2>Commandes en Cours</h2>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ border: "1px solid #ddd", padding: "8px", backgroundColor: "#f2f2f2" }}>ID</th>
              <th style={{ border: "1px solid #ddd", padding: "8px", backgroundColor: "#f2f2f2" }}>Détails</th>
              <th style={{ border: "1px solid #ddd", padding: "8px", backgroundColor: "#f2f2f2" }}>Statut</th>
              <th style={{ border: "1px solid #ddd", padding: "8px", backgroundColor: "#f2f2f2" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{order.id}</td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{order.details}</td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{order.status}</td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  <button
                    onClick={() => markAsDelivered(order.id)}
                    style={{
                      padding: "5px 10px",
                      backgroundColor: "#2ecc71",
                      color: "#fff",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    Marquer comme Livré
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Section : Commandes Livrées */}
      <div style={{ marginBottom: "30px" }}>
        <h2>Commandes Livrées</h2>
        {deliveredOrders.length > 0 ? (
          <ul>
            {deliveredOrders.map((order) => (
              <li key={order.id} style={{ marginBottom: "10px" }}>
                <strong>Commande #{order.id}</strong> : {order.details}
              </li>
            ))}
          </ul>
        ) : (
          <p>Aucune commande livrée pour le moment.</p>
        )}
      </div>

      {/* Section : Service Client et Feedback */}
      {/* Section : Service Client et Feedback */}
<div className="feedback-section">
  <h2>Service Client</h2>
  <textarea
    value={customerFeedback}
    onChange={(e) => setCustomerFeedback(e.target.value)}
    placeholder="Entrez votre feedback ou votre question..."
  />
  <button onClick={sendFeedback}>
    Envoyer Feedback
  </button>
</div>
      </div>
  );
};

// Composant ServiceDetailsPage
const ServiceDetailsPage = () => {
  const { serviceId } = useParams(); // Récupère l'ID du service depuis l'URL
  const navigate = useNavigate();

  return (
    <div className="service-details-page">
      

      {/* Afficher le composant de gestion approprié en fonction de l'ID du service */}
      {serviceId === "1" && <RestaurantCard />} {/* Service de restauration */}
      {serviceId === "2" && <GymServices />} {/* Services de Gym */}
      {serviceId === "3" && <SpaEmergencyService />} {/* Services de Spa */}
      {serviceId === "4" && <EmergencyService />} {/* Services d'Urgence */}
      {serviceId === "5" && <RoomService />} {/* Room Service */}

      <button
        className="back-button"
        onClick={() => navigate("/additional-services-page")}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
          border: "none",
          borderRadius: "5px",
          backgroundColor: "#3498db",
          color: "#fff",
        }}
      >
        Retour aux Services Additionnels
      </button>
    </div>
  );
};

export default ServiceDetailsPage;