import { decorate, observable, computed } from "mobx";
import axios from "axios";
import React, { Component } from "react";

const instance = axios.create({
  baseURL: "https://the-index-api.herokuapp.com"
});

class BookStore {
  books = [];
  query = "";
  loading = true;

  fetchBooks = async () => {
    try {
      const res = await instance.get("/api/books/");
      this.books = res.data;
      this.loading = false;
    } catch (error) {
      console.error(error);
    }
  };

  addBook = async (newBook, author) => {
    newBook = {
      ...newBook,
      authors: [author.id]
    };
    try {
      const res = await instance.post("/api/books/", newBook);
      const book = res.data;
      this.books.push(book);
      author.books.push(book.id);
      this.statusMessage = "Success";
    } catch (error) {
      this.statusMessage = error.response;
    }
  };

  get filteredBooks() {
    return this.books.filter(book => {
      return book.title.toLowerCase().includes(this.query.toLowerCase());
    });
  }

  getBookById = id => {
    return this.books.find(book => +book.id === +id);
  };

  getBooksByColor = color => {
    return this.filteredBooks.filter(book => book.color === color);
  };
}

decorate(BookStore, {
  books: observable,
  query: observable,
  loading: observable,
  filteredBooks: computed
});

const bookStore = new BookStore();
bookStore.fetchBooks();

export default bookStore;
