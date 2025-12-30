"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Modal, ModalFooterButtons } from "@/components/ui/Modal";
import { formatXOF } from "@/lib/utils";
import {
  Plus,
  Search,
  Eye,
  Edit,
  Trash2,
  Shirt,
  Clock,
  Star,
  Grid3X3,
  List,
  Filter,
  Image as ImageIcon,
  Tag,
} from "lucide-react";

// Types
interface Modele {
  id: string;
  nom: string;
  categorie: string;
  sousCategorie?: string;
  description?: string;
  image?: string;
  prixBase: number;
  tempsConfection: number; // en heures
  difficulte: "facile" | "moyen" | "difficile" | "expert";
  tissusRecommandes?: string[];
  variantes?: string[];
  popularite: number; // nombre de commandes
  actif: boolean;
}

// Données mock
const modelesMock: Modele[] = [
  {
    id: "1",
    nom: "Robe Ankara Classic",
    categorie: "Robe",
    sousCategorie: "Soirée",
    description:
      "Robe élégante en tissu wax avec manches évasées et ceinture assortie.",
    image: "/modeles/robe-ankara.jpg",
    prixBase: 45000,
    tempsConfection: 8,
    difficulte: "moyen",
    tissusRecommandes: ["Wax", "Ankara", "Kente"],
    variantes: ["Sans manches", "Manches longues", "Avec traîne"],
    popularite: 45,
    actif: true,
  },
  {
    id: "2",
    nom: "Costume 3 Pièces Prestige",
    categorie: "Costume",
    sousCategorie: "Mariage",
    description:
      "Costume complet avec veste, gilet et pantalon. Coupe moderne et ajustée.",
    prixBase: 95000,
    tempsConfection: 16,
    difficulte: "expert",
    tissusRecommandes: ["Bazin", "Super 150", "Lin"],
    variantes: ["2 pièces", "Avec chapeau"],
    popularite: 32,
    actif: true,
  },
  {
    id: "3",
    nom: "Boubou Grand Modèle",
    categorie: "Boubou",
    sousCategorie: "Traditionnel",
    description: "Boubou ample richement brodé, parfait pour les cérémonies.",
    prixBase: 75000,
    tempsConfection: 12,
    difficulte: "difficile",
    tissusRecommandes: ["Bazin riche", "Jacquard"],
    variantes: ["Broderie simple", "Broderie complète", "Avec bonnet"],
    popularite: 28,
    actif: true,
  },
  {
    id: "4",
    nom: "Ensemble Wax Casual",
    categorie: "Ensemble",
    sousCategorie: "Casual",
    description: "Ensemble décontracté haut et jupe/pantalon en wax coloré.",
    prixBase: 35000,
    tempsConfection: 6,
    difficulte: "facile",
    tissusRecommandes: ["Wax", "Coton imprimé"],
    variantes: ["Avec jupe", "Avec pantalon", "Crop top"],
    popularite: 67,
    actif: true,
  },
  {
    id: "5",
    nom: "Chemise Homme Sur Mesure",
    categorie: "Chemise",
    sousCategorie: "Bureau",
    description: "Chemise classique ajustée avec finitions soignées.",
    prixBase: 18000,
    tempsConfection: 4,
    difficulte: "moyen",
    tissusRecommandes: ["Coton", "Popeline", "Oxford"],
    variantes: ["Col classique", "Col mao", "Manches courtes"],
    popularite: 89,
    actif: true,
  },
  {
    id: "6",
    nom: "Robe de Mariée Princesse",
    categorie: "Robe",
    sousCategorie: "Mariage",
    description: "Robe de mariée volumineuse avec bustier et jupe en tulle.",
    prixBase: 180000,
    tempsConfection: 40,
    difficulte: "expert",
    tissusRecommandes: ["Dentelle", "Tulle", "Satin", "Organza"],
    variantes: ["Avec traîne courte", "Avec traîne longue", "Sans traîne"],
    popularite: 15,
    actif: true,
  },
  {
    id: "7",
    nom: "Pantalon Palazzo",
    categorie: "Pantalon",
    sousCategorie: "Casual",
    description: "Pantalon large et fluide, très confortable.",
    prixBase: 15000,
    tempsConfection: 3,
    difficulte: "facile",
    tissusRecommandes: ["Crêpe", "Mousseline", "Lin"],
    popularite: 54,
    actif: true,
  },
  {
    id: "8",
    nom: "Jupe Crayon Élégante",
    categorie: "Jupe",
    sousCategorie: "Bureau",
    description: "Jupe ajustée mi-longue avec fente arrière.",
    prixBase: 12000,
    tempsConfection: 2,
    difficulte: "facile",
    tissusRecommandes: ["Wax", "Gabardine", "Crêpe"],
    popularite: 41,
    actif: true,
  },
];

const categories = [
  "Tous",
  "Robe",
  "Costume",
  "Boubou",
  "Ensemble",
  "Chemise",
  "Pantalon",
  "Jupe",
];
const difficultes = ["Tous", "facile", "moyen", "difficile", "expert"];

const getDifficulteConfig = (difficulte: string) => {
  const config: Record<
    string,
    { label: string; className: string; stars: number }
  > = {
    facile: {
      label: "Facile",
      className: "bg-emerald-100 text-emerald-700 border border-emerald-300",
      stars: 1,
    },
    moyen: {
      label: "Moyen",
      className: "bg-teal-100 text-teal-700 border border-teal-300",
      stars: 2,
    },
    difficile: {
      label: "Difficile",
      className: "bg-orange-100 text-orange-700 border border-orange-300",
      stars: 3,
    },
    expert: {
      label: "Expert",
      className: "bg-red-100 text-red-700 border border-red-300",
      stars: 4,
    },
  };
  return (
    config[difficulte] || {
      label: difficulte,
      className: "bg-gray-100 text-gray-700",
      stars: 0,
    }
  );
};

export default function CataloguePage() {
  const [modeles, setModeles] = useState<Modele[]>(modelesMock);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategorie, setFilterCategorie] = useState("Tous");
  const [filterDifficulte, setFilterDifficulte] = useState("Tous");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedModele, setSelectedModele] = useState<Modele | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Filtrage
  const filteredModeles = modeles.filter((m) => {
    const matchSearch =
      m.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCategorie =
      filterCategorie === "Tous" || m.categorie === filterCategorie;
    const matchDifficulte =
      filterDifficulte === "Tous" || m.difficulte === filterDifficulte;
    return matchSearch && matchCategorie && matchDifficulte;
  });

  // Stats
  const stats = {
    total: modeles.length,
    actifs: modeles.filter((m) => m.actif).length,
    categories: [...new Set(modeles.map((m) => m.categorie))].length,
    populaire: modeles.reduce(
      (max, m) => (m.popularite > max.popularite ? m : max),
      modeles[0]
    ),
  };

  const handleView = (modele: Modele) => {
    setSelectedModele(modele);
    setIsViewModalOpen(true);
  };

  const handleEdit = (modele: Modele) => {
    setSelectedModele(modele);
    setIsModalOpen(true);
  };

  const handleDelete = (modele: Modele) => {
    setSelectedModele(modele);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (selectedModele) {
      setModeles(modeles.filter((m) => m.id !== selectedModele.id));
      setIsDeleteModalOpen(false);
      setSelectedModele(null);
    }
  };

  const handleCreate = () => {
    setSelectedModele(null);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-teal-800">Catalogue</h1>
          <p className="text-teal-600 mt-1">Gérez vos modèles de vêtements</p>
        </div>
        <Button
          onClick={handleCreate}
          className="bg-teal-700 hover:bg-teal-600 text-white shadow-lg"
        >
          <Plus className="h-4 w-4 mr-2" />
          Nouveau modèle
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="kpi-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-teal-600">Total modèles</p>
                <p className="text-2xl font-bold text-teal-800">
                  {stats.total}
                </p>
              </div>
              <div className="p-3 bg-teal-100 rounded-xl">
                <Shirt className="h-6 w-6 text-teal-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="kpi-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-teal-600">Actifs</p>
                <p className="text-2xl font-bold text-teal-800">
                  {stats.actifs}
                </p>
              </div>
              <div className="p-3 bg-emerald-100 rounded-xl">
                <Tag className="h-6 w-6 text-emerald-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="kpi-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-teal-600">Catégories</p>
                <p className="text-2xl font-bold text-teal-800">
                  {stats.categories}
                </p>
              </div>
              <div className="p-3 bg-purple-100 rounded-xl">
                <Grid3X3 className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="kpi-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-amber-600">Plus populaire</p>
                <p className="text-lg font-bold text-amber-700 truncate">
                  {stats.populaire?.nom}
                </p>
              </div>
              <div className="p-3 bg-amber-100 rounded-xl">
                <Star className="h-6 w-6 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtres */}
      <Card className="border border-[#B5E5E8] shadow-[0_10px_40px_-10px_rgba(83,176,183,0.3)]">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-teal-500" />
                <Input
                  placeholder="Rechercher un modèle..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-[#B5E5E8] focus:border-[#53B0B7]"
                />
              </div>
            </div>
            <Select value={filterCategorie} onValueChange={setFilterCategorie}>
              <SelectTrigger className="w-full md:w-40 border-[#B5E5E8]">
                <SelectValue placeholder="Catégorie" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              value={filterDifficulte}
              onValueChange={setFilterDifficulte}
            >
              <SelectTrigger className="w-full md:w-40 border-[#B5E5E8]">
                <SelectValue placeholder="Difficulté" />
              </SelectTrigger>
              <SelectContent>
                {difficultes.map((d) => (
                  <SelectItem key={d} value={d}>
                    {d === "Tous" ? "Toutes" : getDifficulteConfig(d).label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="flex items-center gap-1 border border-[#B5E5E8] rounded-lg p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded ${
                  viewMode === "grid"
                    ? "bg-teal-100 text-teal-700"
                    : "text-teal-500 hover:bg-[#F0FAFA]"
                }`}
              >
                <Grid3X3 className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded ${
                  viewMode === "list"
                    ? "bg-teal-100 text-teal-700"
                    : "text-teal-500 hover:bg-[#F0FAFA]"
                }`}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Grille / Liste des modèles */}
      {filteredModeles.length === 0 ? (
        <Card className="border border-[#B5E5E8]">
          <CardContent className="p-8 text-center">
            <Shirt className="h-12 w-12 text-[#B5E5E8] mx-auto mb-3" />
            <p className="text-teal-600">Aucun modèle trouvé</p>
          </CardContent>
        </Card>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredModeles.map((modele) => {
            const diffConfig = getDifficulteConfig(modele.difficulte);
            return (
              <Card
                key={modele.id}
                className="border border-[#B5E5E8] shadow-[0_10px_40px_-10px_rgba(83,176,183,0.3)] hover:shadow-[0_20px_50px_-15px_rgba(83,176,183,0.4)] transition-all duration-300 overflow-hidden group"
              >
                {/* Image placeholder */}
                <div className="h-40 bg-gradient-to-br from-[#E0F5F6] to-[#B5E5E8] flex items-center justify-center relative">
                  <Shirt className="h-16 w-16 text-teal-400" />
                  <div className="absolute top-2 right-2">
                    <Badge className={diffConfig.className}>
                      {diffConfig.label}
                    </Badge>
                  </div>
                  <div className="absolute top-2 left-2">
                    <Badge className="bg-white/90 text-teal-700 border border-[#B5E5E8]">
                      {modele.categorie}
                    </Badge>
                  </div>
                </div>

                <CardContent className="p-4">
                  <h3 className="font-semibold text-teal-800 mb-1 truncate">
                    {modele.nom}
                  </h3>
                  {modele.sousCategorie && (
                    <p className="text-xs text-teal-600 mb-2">
                      {modele.sousCategorie}
                    </p>
                  )}

                  <div className="flex items-center justify-between mb-3">
                    <span className="text-lg font-bold text-teal-800">
                      {formatXOF(modele.prixBase)}
                    </span>
                    <span className="text-xs text-teal-600 flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {modele.tempsConfection}h
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs text-teal-600 mb-3">
                    <span className="flex items-center gap-1">
                      <Star className="h-3 w-3 text-amber-500" />{" "}
                      {modele.popularite} commandes
                    </span>
                  </div>

                  <div className="flex items-center gap-1 pt-3 border-t border-[#E0F5F6]">
                    <button
                      className="btn-action btn-action-view flex-1"
                      onClick={() => handleView(modele)}
                      title="Voir"
                    >
                      <Eye size={16} />
                    </button>
                    <button
                      className="btn-action btn-action-edit flex-1"
                      onClick={() => handleEdit(modele)}
                      title="Modifier"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      className="btn-action btn-action-delete flex-1"
                      onClick={() => handleDelete(modele)}
                      title="Supprimer"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        <Card className="border border-[#B5E5E8] shadow-[0_10px_40px_-10px_rgba(83,176,183,0.3)]">
          <CardContent className="p-0">
            <div className="divide-y divide-[#E0F5F6]">
              {filteredModeles.map((modele, index) => {
                const diffConfig = getDifficulteConfig(modele.difficulte);
                return (
                  <div
                    key={modele.id}
                    className={`flex items-center gap-4 p-4 ${
                      index % 2 === 0 ? "bg-white" : "bg-[#F0FAFA]"
                    } hover:bg-[#E0F5F6] transition-colors`}
                  >
                    <div className="w-16 h-16 bg-gradient-to-br from-[#E0F5F6] to-[#B5E5E8] rounded-xl flex items-center justify-center flex-shrink-0">
                      <Shirt className="h-8 w-8 text-teal-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-teal-800 truncate">
                          {modele.nom}
                        </h3>
                        <Badge className="bg-white text-teal-700 border border-[#B5E5E8] text-xs">
                          {modele.categorie}
                        </Badge>
                      </div>
                      <p className="text-sm text-teal-600 truncate">
                        {modele.description}
                      </p>
                    </div>
                    <div className="hidden sm:flex items-center gap-4">
                      <div className="text-right">
                        <p className="font-bold text-teal-800">
                          {formatXOF(modele.prixBase)}
                        </p>
                        <p className="text-xs text-teal-600">
                          {modele.tempsConfection}h
                        </p>
                      </div>
                      <Badge className={diffConfig.className}>
                        {diffConfig.label}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        className="btn-action btn-action-view"
                        onClick={() => handleView(modele)}
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        className="btn-action btn-action-edit"
                        onClick={() => handleEdit(modele)}
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        className="btn-action btn-action-delete"
                        onClick={() => handleDelete(modele)}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Modal Voir Modèle */}
      <Modal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        title="Détails du modèle"
        size="lg"
        variant="gradient"
      >
        {selectedModele && (
          <div className="space-y-6">
            {/* Image et infos principales */}
            <div className="flex gap-6">
              <div className="w-32 h-32 bg-gradient-to-br from-[#E0F5F6] to-[#B5E5E8] rounded-xl flex items-center justify-center flex-shrink-0">
                <Shirt className="h-16 w-16 text-teal-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-teal-800">
                  {selectedModele.nom}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <Badge className="bg-teal-100 text-teal-700 border border-teal-300">
                    {selectedModele.categorie}
                  </Badge>
                  {selectedModele.sousCategorie && (
                    <Badge className="bg-purple-100 text-purple-700 border border-purple-300">
                      {selectedModele.sousCategorie}
                    </Badge>
                  )}
                  <Badge
                    className={
                      getDifficulteConfig(selectedModele.difficulte).className
                    }
                  >
                    {getDifficulteConfig(selectedModele.difficulte).label}
                  </Badge>
                </div>
                <p className="text-teal-600 mt-3">
                  {selectedModele.description}
                </p>
              </div>
            </div>

            {/* Infos détaillées */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-[#B5E5E8]">
              <div className="bg-[#F0FAFA] p-3 rounded-xl">
                <p className="text-xs text-teal-600">Prix de base</p>
                <p className="text-lg font-bold text-teal-800">
                  {formatXOF(selectedModele.prixBase)}
                </p>
              </div>
              <div className="bg-[#F0FAFA] p-3 rounded-xl">
                <p className="text-xs text-teal-600">Temps de confection</p>
                <p className="text-lg font-bold text-teal-800">
                  {selectedModele.tempsConfection}h
                </p>
              </div>
              <div className="bg-[#F0FAFA] p-3 rounded-xl">
                <p className="text-xs text-teal-600">Popularité</p>
                <p className="text-lg font-bold text-teal-800">
                  {selectedModele.popularite} cmd
                </p>
              </div>
              <div className="bg-[#F0FAFA] p-3 rounded-xl">
                <p className="text-xs text-teal-600">Statut</p>
                <p className="text-lg font-bold text-emerald-600">
                  {selectedModele.actif ? "Actif" : "Inactif"}
                </p>
              </div>
            </div>

            {/* Tissus recommandés */}
            {selectedModele.tissusRecommandes &&
              selectedModele.tissusRecommandes.length > 0 && (
                <div className="pt-4 border-t border-[#B5E5E8]">
                  <h4 className="font-semibold text-teal-800 mb-2">
                    Tissus recommandés
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedModele.tissusRecommandes.map((tissu, i) => (
                      <Badge
                        key={i}
                        className="bg-purple-100 text-purple-700 border border-purple-300"
                      >
                        {tissu}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

            {/* Variantes */}
            {selectedModele.variantes &&
              selectedModele.variantes.length > 0 && (
                <div className="pt-4 border-t border-[#B5E5E8]">
                  <h4 className="font-semibold text-teal-800 mb-2">
                    Variantes disponibles
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedModele.variantes.map((variante, i) => (
                      <Badge
                        key={i}
                        className="bg-teal-100 text-teal-700 border border-teal-300"
                      >
                        {variante}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
          </div>
        )}
        <div className="mt-6">
          <ModalFooterButtons
            onCancel={() => setIsViewModalOpen(false)}
            cancelText="Fermer"
          />
        </div>
      </Modal>

      {/* Modal Créer/Modifier Modèle */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedModele ? "Modifier le modèle" : "Nouveau modèle"}
        size="lg"
        variant="gradient"
        footer={
          <ModalFooterButtons
            onCancel={() => setIsModalOpen(false)}
            onConfirm={() => setIsModalOpen(false)}
            cancelText="Annuler"
            confirmText={selectedModele ? "Enregistrer" : "Créer"}
          />
        }
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <Label className="text-teal-700">Nom du modèle *</Label>
              <Input
                className="mt-1 border-[#B5E5E8]"
                placeholder="Ex: Robe Ankara Classic"
                defaultValue={selectedModele?.nom}
              />
            </div>
            <div>
              <Label className="text-teal-700">Catégorie *</Label>
              <Select defaultValue={selectedModele?.categorie}>
                <SelectTrigger className="mt-1 border-[#B5E5E8]">
                  <SelectValue placeholder="Sélectionner" />
                </SelectTrigger>
                <SelectContent>
                  {categories
                    .filter((c) => c !== "Tous")
                    .map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-teal-700">Sous-catégorie</Label>
              <Input
                className="mt-1 border-[#B5E5E8]"
                placeholder="Ex: Soirée, Mariage, Bureau..."
                defaultValue={selectedModele?.sousCategorie}
              />
            </div>
            <div>
              <Label className="text-teal-700">Prix de base (FCFA) *</Label>
              <Input
                type="number"
                className="mt-1 border-[#B5E5E8]"
                placeholder="0"
                defaultValue={selectedModele?.prixBase}
              />
            </div>
            <div>
              <Label className="text-teal-700">
                Temps de confection (heures) *
              </Label>
              <Input
                type="number"
                className="mt-1 border-[#B5E5E8]"
                placeholder="0"
                defaultValue={selectedModele?.tempsConfection}
              />
            </div>
            <div>
              <Label className="text-teal-700">Difficulté *</Label>
              <Select defaultValue={selectedModele?.difficulte || "moyen"}>
                <SelectTrigger className="mt-1 border-[#B5E5E8]">
                  <SelectValue placeholder="Sélectionner" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="facile">Facile</SelectItem>
                  <SelectItem value="moyen">Moyen</SelectItem>
                  <SelectItem value="difficile">Difficile</SelectItem>
                  <SelectItem value="expert">Expert</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-teal-700">Statut</Label>
              <Select
                defaultValue={selectedModele?.actif ? "actif" : "inactif"}
              >
                <SelectTrigger className="mt-1 border-[#B5E5E8]">
                  <SelectValue placeholder="Sélectionner" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="actif">Actif</SelectItem>
                  <SelectItem value="inactif">Inactif</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="col-span-2">
              <Label className="text-teal-700">Description</Label>
              <Textarea
                className="mt-1 border-[#B5E5E8]"
                placeholder="Description détaillée du modèle..."
                rows={3}
                defaultValue={selectedModele?.description}
              />
            </div>
            <div className="col-span-2">
              <Label className="text-teal-700">
                Tissus recommandés (séparés par virgule)
              </Label>
              <Input
                className="mt-1 border-[#B5E5E8]"
                placeholder="Ex: Wax, Bazin, Soie"
                defaultValue={selectedModele?.tissusRecommandes?.join(", ")}
              />
            </div>
            <div className="col-span-2">
              <Label className="text-teal-700">
                Variantes (séparées par virgule)
              </Label>
              <Input
                className="mt-1 border-[#B5E5E8]"
                placeholder="Ex: Sans manches, Manches longues"
                defaultValue={selectedModele?.variantes?.join(", ")}
              />
            </div>
          </div>
        </div>
      </Modal>

      {/* Modal Suppression */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Confirmer la suppression"
        size="sm"
        variant="light"
        footer={
          <ModalFooterButtons
            onCancel={() => setIsDeleteModalOpen(false)}
            onConfirm={confirmDelete}
            cancelText="Annuler"
            confirmText="Supprimer"
            confirmVariant="destructive"
          />
        }
      >
        <p className="text-teal-700">
          Êtes-vous sûr de vouloir supprimer le modèle{" "}
          <strong>{selectedModele?.nom}</strong> ?
        </p>
      </Modal>
    </div>
  );
}
