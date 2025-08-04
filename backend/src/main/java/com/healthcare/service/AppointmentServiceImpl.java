package com.healthcare.service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.healthcare.dto.AppointmentDto;
import com.healthcare.entities.Appointment;
import com.healthcare.entities.AppointmentStatus;
import com.healthcare.repository.AppointmentRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class AppointmentServiceImpl implements AppointmentService {

    @Autowired
    private AppointmentRepository appointmentRepository;	

//    @Override
//    public boolean isSlotAvailable(Appointment appointment) {
//        return !appointmentRepository.existsByDoctorIdAndStartTimeLessThanEqualAndEndTimeGreaterThanEqual(
//                appointment.getDoctor().getDoctorId(),
//                appointment.getEndTime(),
//                appointment.getStartTime());
//    }
    @Override
    public boolean isSlotAvailable(Appointment appointment) {
        if (appointment.getDoctor() == null) {
            throw new RuntimeException("Doctor object is not set in the Appointment object");
        }
        return !appointmentRepository.existsByDoctor_DoctorIdAndAppointmentDateAndStartTimeLessThanEqualAndEndTimeGreaterThanEqual(
                appointment.getDoctor().getDoctorId(),
                appointment.getAppointmentDate(),
                appointment.getEndTime(),
                appointment.getStartTime());
    }

    @Override
    public Appointment bookAppointment(Appointment appointment) {
        if (isSlotAvailable(appointment)) {
            appointment.setStatus(AppointmentStatus.SCHEDULED);
            return appointmentRepository.save(appointment);
        }
        throw new RuntimeException("Slot is unavailable");
    }

    @Override
    public Appointment updateAppointment(Long id, Appointment appointment) {
    	System.out.println(id);
    	System.out.println(appointment);
     
        Optional<Appointment> existingAppointment = appointmentRepository.findById(id);
        if (existingAppointment.isPresent() && existingAppointment.get().getStatus() != AppointmentStatus.COMPLETED) {
            appointment.setId(id);
            return appointmentRepository.save(appointment);
        }
        throw new RuntimeException("Cannot update completed appointment");
    }

    @Override
    public boolean cancelAppointment(Long id) {
        Optional<Appointment> appointment = appointmentRepository.findById(id);
        if (appointment.isPresent() && appointment.get().getStatus() != AppointmentStatus.COMPLETED) {
            appointment.get().setStatus(AppointmentStatus.CANCELLED);
            appointmentRepository.save(appointment.get());
            return true;
        }
        return false;
    }

    @Override
    public List<Appointment> getAllAppointments() {
        return appointmentRepository.findAll();
    }

    @Override
    public List<Appointment> getAppointmentsByUser(Long userId) {
        return appointmentRepository.findByPatient_UserId(userId);
    }

    @Override
    public List<Appointment> getAppointmentsByDoctor(Long doctorId) {
        return appointmentRepository.findByDoctor_DoctorId(doctorId);
    }

    @Override
    public List<Appointment> getUserAppointmentHistory(Long userId) {
        return appointmentRepository.findByPatient_UserId(userId);
    }

    @Override
    public List<AppointmentDto> getDoctorDashboard(Long doctorId) {
        List<Appointment> appointments = appointmentRepository.findByDoctor_DoctorId(doctorId);
        List<AppointmentDto> appointmentDtos = new ArrayList<>();

        for (Appointment appointment : appointments) {
            AppointmentDto appointmentDto = new AppointmentDto();
            appointmentDto.setAppointmentDate(appointment.getAppointmentDate());
            appointmentDto.setStartTime(appointment.getStartTime());
            appointmentDto.setEndTime(appointment.getEndTime());
            appointmentDto.setStatus(appointment.getStatus());
            appointmentDto.setDoctorId(appointment.getDoctorId());
            appointmentDto.setPatientId(appointment.getPatient().getUserId()); // Assuming the 'User' entity has a 'getUserId()' method
            appointmentDto.setCreatedAt(appointment.getCreatedAt());
            
            appointmentDtos.add(appointmentDto);
        }
        
        return appointmentDtos;
    }


    @Override
    public boolean isSlotAvailable(Long doctorId, LocalDate appointmentDate, LocalTime startTime, LocalTime endTime) {
        return !appointmentRepository.existsByDoctor_DoctorIdAndAppointmentDateAndStartTimeLessThanEqualAndEndTimeGreaterThanEqual(
                doctorId,
                appointmentDate,
                endTime,
                startTime);
    }

	@Override
	public long getAppointmentPendingCounts() {
		// TODO Auto-generated method stub
		return appointmentRepository.getAppointmentsPendingCount();
	}

	@Override
	public long getAppointmentScheduledCounts() {
		return appointmentRepository.getAppointmentsScheduledCount();
	}

	@Override
	public long getAppointmentCompletedCounts() {
		return appointmentRepository.getAppointmentsCompletedCount();
	}

	@Override
	public long getAppointmentCancelledCounts() {
		return appointmentRepository.getAppointmentsCancelledCount();
	}

	
   
}
