import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { XIcon } from "lucide-react";

export function Search({ searchQuery, setSearchQuery, handleSearch }) {
  return (
    <form 
      onSubmit={handleSearch}
      className="grid w-full items-center gap-2"
    >
        <Input 
            type="search" 
            onChange={(e) => {
              setSearchQuery(e.target.value)
            }}
            value={searchQuery}
            placeholder="Search notes by title, content, or tags"
            className="bg-white"
        />
        <Button 
              type="submit" 
              variant="outline"
              className="w-fit"
          >Search</Button>
    </form>
  )
}
