package com.team9.manosarthi_backend.Services;

import com.team9.manosarthi_backend.DTO.AdminDashboardDTO;
import com.team9.manosarthi_backend.DTO.SupDashboardDTO;
import com.team9.manosarthi_backend.DTO.WorkerDetailsDTO;
import com.team9.manosarthi_backend.Entities.*;
import org.apache.commons.lang3.tuple.Pair;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Optional;

public interface SupervisorService {
    Supervisor viewProfile(int id);

    Worker addworker(Worker worker);

    List<Village> findSubVillage(int userid,boolean assigned);

    List<Worker> getSubWorkers(int userid,int pagenumber, int pagesize);

    List<Worker> getVillWorker(int vilcode);

    Pair<Worker,Boolean> ReassignWorker(Worker updatedWorker);

    Pair<Boolean,Boolean> DeleteWorker(Worker worker);

    WorkerDetailsDTO workerdetails(int workerid,int userid);

    List<List<FollowUpSchedule>> subdistMissedFollowup(int userid);

    SupDashboardDTO dashboard(int supid);

}
