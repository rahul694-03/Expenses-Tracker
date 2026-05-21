package com.expense.tracker.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.expense.tracker.entity.Expense;

public interface ExpenseRepository extends JpaRepository<Expense, Long> {

    // 🔥 USER FILTER
    List<Expense> findByEmail(String email);
}