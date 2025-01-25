import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const books = [
  {
    id: "1",
    title: "The Book of Knowledge",
    author: "Scholar Name",
    type: "Religious",
    status: "Published",
    categories: ["Islamic Studies", "Education"],
  },
  {
    id: "2",
    title: "Principles of Islamic Jurisprudence",
    author: "Dr. Ahmad Ali",
    type: "Legal",
    status: "In Review",
    categories: ["Islamic Law", "Jurisprudence"],
  },
  {
    id: "3",
    title: "Hadith Compilation",
    author: "Imam Bukhari",
    type: "Scholarly",
    status: "Published",
    categories: ["Hadith", "Islamic Studies"],
  },
]

export default function BooksPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Books</h1>
        <Button asChild>
          <Link href="/dashboard/books/new">Add New Book</Link>
        </Button>
      </div>
      <div className="flex items-center space-x-4">
        <div className="flex-1">
          <Label htmlFor="search" className="sr-only">
            Search
          </Label>
          <Input id="search" placeholder="Search books..." />
        </div>
        <div className="flex-1">
          <Label htmlFor="filter-type" className="sr-only">
            Filter by Type
          </Label>
          <Select>
            <SelectTrigger id="filter-type">
              <SelectValue placeholder="Filter by Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="religious">Religious</SelectItem>
              <SelectItem value="legal">Legal</SelectItem>
              <SelectItem value="scholarly">Scholarly</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex-1">
          <Label htmlFor="filter-status" className="sr-only">
            Filter by Status
          </Label>
          <Select>
            <SelectTrigger id="filter-status">
              <SelectValue placeholder="Filter by Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="published">Published</SelectItem>
              <SelectItem value="in-review">In Review</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Categories</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {books.map((book) => (
              <TableRow key={book.id}>
                <TableCell className="font-medium">{book.title}</TableCell>
                <TableCell>{book.author}</TableCell>
                <TableCell>{book.type}</TableCell>
                <TableCell>
                  <Badge variant={book.status === "Published" ? "default" : "secondary"}>{book.status}</Badge>
                </TableCell>
                <TableCell>
                  {book.categories.map((category) => (
                    <Badge key={category} variant="outline" className="mr-1">
                      {category}
                    </Badge>
                  ))}
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={`/dashboard/books/${book.id}`}>Edit</Link>
                  </Button>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={`/dashboard/books/process/${book.id}`}>Process</Link>
                  </Button>
                  <Button variant="ghost" size="sm">
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

