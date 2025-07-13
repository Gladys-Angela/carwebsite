import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import api from "@/api";

const SearchFilters = ({ onSearch }: { onSearch: (filters: any) => void }) => {
  const [makes, setMakes] = useState([]);
  const [models, setModels] = useState([]);
  const [filters, setFilters] = useState({
    make: '',
    model: '',
    year_from: '',
    year_to: '',
    price_min: '',
    price_max: '',
    condition: '',
    transmission: '',
    fuelType: '',
  });

  useEffect(() => {
    const fetchMakes = async () => {
      try {
        const response = await api.get('/cars/makes');
        setMakes(response.data);
      } catch (error) {
        console.error("Error fetching makes:", error);
      }
    };

    const fetchModels = async () => {
      try {
        const response = await api.get('/cars/models');
        setModels(response.data);
      } catch (error) {
        console.error("Error fetching models:", error);
      }
    };

    fetchMakes();
    fetchModels();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFilters({ ...filters, [name]: value });
  };

  const handleSearch = () => {
    onSearch(filters);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="space-y-2">
        <Label htmlFor="make">Make</Label>
        <Select onValueChange={(value) => handleSelectChange('make', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select Make" />
          </SelectTrigger>
          <SelectContent>
            {makes.map((make) => (
              <SelectItem key={make} value={make}>{make}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="model">Model</Label>
        <Select onValueChange={(value) => handleSelectChange('model', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select Model" />
          </SelectTrigger>
          <SelectContent>
            {models.map((model) => (
              <SelectItem key={model} value={model}>{model}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="year">Year</Label>
        <div className="flex gap-2">
          <Input name="year_from" placeholder="From" type="number" min="1990" max="2024" onChange={handleInputChange} />
          <Input name="year_to" placeholder="To" type="number" min="1990" max="2024" onChange={handleInputChange} />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="price">Price Range</Label>
        <div className="flex gap-2">
          <Input name="price_min" placeholder="Min" type="number" min="0" onChange={handleInputChange} />
          <Input name="price_max" placeholder="Max" type="number" min="0" onChange={handleInputChange} />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="condition">Condition</Label>
        <Select onValueChange={(value) => handleSelectChange('condition', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Any Condition" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="new">New</SelectItem>
            <SelectItem value="used">Used</SelectItem>
            <SelectItem value="certified">Certified Pre-Owned</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="transmission">Transmission</Label>
        <Select onValueChange={(value) => handleSelectChange('transmission', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Any" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="automatic">Automatic</SelectItem>
            <SelectItem value="manual">Manual</SelectItem>
            <SelectItem value="cvt">CVT</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="fuel">Fuel Type</Label>
        <Select onValueChange={(value) => handleSelectChange('fuelType', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Any" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="gasoline">Gasoline</SelectItem>
            <SelectItem value="hybrid">Hybrid</SelectItem>
            <SelectItem value="electric">Electric</SelectItem>
            <SelectItem value="diesel">Diesel</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-end col-span-full">
        <Button onClick={handleSearch} className="w-full">
          Search
        </Button>
      </div>
    </div>
  );
};

export default SearchFilters;
