# HealthCare-Application

## 🩺 Overview
A Java-based backend system for managing healthcare workflows including users, doctors, appointments, payments, and notifications. Designed using Spring Boot and layered architecture to ensure modularity, scalability, and security.

---

## 📦 Package Structure

### ✅ Root Packages
- `BackendApplication.java`: Entry point for launching the Spring Boot application.

### 📂 `com.healthcare.controller`
Handles incoming HTTP requests and maps them to service calls:
- `AdminController.java`
- `AppointmentController.java`
- `DoctorController.java`
- `NotificationController.java`
- `PaymentController.java`
- `UserController.java`

### 📂 `com.healthcare.dto`
Encapsulates data transfer between layers and client:
- `ApiResponse.java`
- `AppointmentDto.java`
- `ForgotPasswordDTO.java`
- `PaymentRequestDTO.java`
- `PaymentResponseDTO.java`
- `SigninResponse.java`
---

## 🧪 Technologies Used

- Java 17+
- Spring Boot
- Spring Security (JWT)
- Hibernate
- Maven

---

## 📌 Features

- Secure authentication via JWT
- Role-based access control
- CRUD operations for Users, Doctors, Appointments
- Integrated email and SMS notifications
- Payment handling & response tracking

---

## 🚀 Getting Started

### Prerequisites
- Java 17 or higher
- Maven

### Setup

```bash
# Clone the repository
git clone https://github.com/your-username/HealthCare-Application.git

# Change directory
cd HealthCare-Application

# Build the project
mvn clean install

# Run the application
mvn spring-boot:run
```

### Configuration
- Database and environment variables can be set in `application.properties` or `application.yml`.
- JWT secret and other sensitive configs should be managed securely.

---

## 👨‍💻 Contributing

Contributions are welcome! Please open an issue or submit a pull request for suggested improvements.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 📬 Contact

For questions or feedback, reach out via [GitHub Issues](https://github.com/TwinkleKr/HealthCare-Application/).
