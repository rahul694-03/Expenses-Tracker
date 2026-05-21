package com.expense.tracker.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.expense.tracker.entity.Expense;
import com.expense.tracker.repository.ExpenseRepository;

@Service
public class ExpenseService {

    @Autowired
    private ExpenseRepository repository;

    // GET USER EXPENSES
    public List<Expense> getExpensesByEmail(String email) {
        return repository.findByEmail(email);
    }

    // ADD EXPENSE
    public Expense addExpense(Expense expense) {
        return repository.save(expense);
    }

    // DELETE
    public void deleteExpense(Long id) {
        repository.deleteById(id);
    }

    // UPDATE
    public Expense updateExpense(Long id, Expense updatedExpense) {

        Expense expense = repository.findById(id).orElseThrow();

        expense.setTitle(updatedExpense.getTitle());
        expense.setAmount(updatedExpense.getAmount());
        expense.setCategory(updatedExpense.getCategory());
        expense.setEmail(updatedExpense.getEmail());

        return repository.save(expense);
    }
}