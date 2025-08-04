package com.healthcare.service;

import java.time.LocalTime;
import java.util.List;

import com.healthcare.dto.AppointmentDto;
import com.healthcare.entities.Appointment;

public interface AppointmentService {
    boolean isSlotAvailable(Appointment appointment);
    Appointment bookAppointment(Appointment appointment);
    Appointment updateAppointment(Long id, Appointment appointment);
    boolean cancelAppointment(Long id);
    List<Appointment> getAllAppointments();
    List<Appointment> getAppointmentsByUser(Long userId);
    List<Appointment> getAppointmentsByDoctor(Long doctorId);
    List<Appointment> getUserAppointmentHistory(Long userId);
    List<AppointmentDto> getDoctorDashboard(Long doctorId);
 // Overloaded method to check slot availability using individual fields
    boolean isSlotAvailable(Long doctorId, 
                            java.time.LocalDate appointmentDate, 
                            LocalTime startTime, 
                            LocalTime endTime);
    
    long getAppointmentPendingCounts();
    
    long getAppointmentScheduledCounts();
    
    long getAppointmentCompletedCounts();
    
    long getAppointmentCancelledCounts();
}