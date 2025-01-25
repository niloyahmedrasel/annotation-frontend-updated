"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"

interface Book {
  id: string
  title: string
  author: string
  status: "Unprocessed" | "In Progress" | "Processed"
}

const initialBooks: Book[] = [
  { id: "1", title: "The Book of Knowledge", author: "Scholar Name", status: "Unprocessed" },
  { id: "2", title: "Principles of Islamic Jurisprudence", author: "Dr. Ahmad Ali", status: "In Progress" },
  { id: "3", title: "Hadith Compilation", author: "Imam Bukhari", status: "Processed" },
]

export default function ProcessBooksPage() {
  const [books, setBooks] = useState<Book[]>(initialBooks)
  const [selectedBook, setSelectedBook] = useState<Book | null>(null)
  const [categories, setCategories] = useState<string[]>([])
  const [newCategory, setNewCategory] = useState("")
  const [bookDependency, setBookDependency] = useState("")

  const updateBookStatus = (id: string, newStatus: Book["status"]) => {
    setBooks(books.map((book) => (book.id === id ? { ...book, status: newStatus } : book)))
  }

  const addCategory = () => {
    if (newCategory.trim() !== "" && !categories.includes(newCategory)) {
      setCategories([...categories, newCategory])
      setNewCategory("")
    }
  }

  const removeCategory = (category: string) => {
    setCategories(categories.filter((c) => c !== category))
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Process Books</h1>
      <div className="flex space-x-4">
        <div className="w-1/3">
          <Label htmlFor="book-select">Select a book to process</Label>
          <Select onValueChange={(value) => setSelectedBook(books.find((book) => book.id === value) || null)}>
            <SelectTrigger id="book-select">
              <SelectValue placeholder="Select a book" />
            </SelectTrigger>
            <SelectContent>
              {books.map((book) => (
                <SelectItem key={book.id} value={book.id}>
                  {book.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="w-1/3">
          <Label htmlFor="status-select">Update Status</Label>
          <Select
            onValueChange={(value) => selectedBook && updateBookStatus(selectedBook.id, value as Book["status"])}
            disabled={!selectedBook}
          >
            <SelectTrigger id="status-select">
              <SelectValue placeholder="Update status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Unprocessed">Unprocessed</SelectItem>
              <SelectItem value="In Progress">In Progress</SelectItem>
              <SelectItem value="Processed">Processed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      {selectedBook && (
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">{selectedBook.title}</h2>
          <p>Author: {selectedBook.author}</p>
          <div className="flex items-center space-x-2">
            <span>Current Status:</span> <Badge>{selectedBook.status}</Badge>
          </div>
          <div>
            <Label htmlFor="categories">Categories</Label>
            <div className="flex space-x-2 mb-2">
              <Input
                id="categories"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder="Add a category"
              />
              <Button onClick={addCategory}>Add</Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Badge key={category} variant="secondary" className="text-sm">
                  {category}
                  <button onClick={() => removeCategory(category)} className="ml-2 text-xs">
                    ×
                  </button>
                </Badge>
              ))}
            </div>
          </div>
          <div>
            <Label htmlFor="book-dependency">Book Dependency</Label>
            <Input
              id="book-dependency"
              value={bookDependency}
              onChange={(e) => setBookDependency(e.target.value)}
              placeholder="Enter dependent book title"
            />
          </div>
          <div>
            <Label htmlFor="processing-notes">Processing Notes</Label>
            <Textarea
              id="processing-notes"
              placeholder="Enter any notes about the processing of this book"
              className="h-32"
            />
          </div>
          <Button>Save Changes</Button>
        </div>
      )}
    </div>
  )
}

