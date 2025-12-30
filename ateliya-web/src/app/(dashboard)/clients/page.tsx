"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Modal, ModalFooterButtons } from "@/components/ui/Modal";
import { Pagination } from "@/components/ui/Pagination";
import { formatXOF, formatDateFR, getInitials } from "@/lib/utils";
import {
  Plus,
  Search,
  Eye,
  Edit,
  Trash2,
  User,
  Phone,
  Mail,
  MapPin,
  Ruler,
  ShoppingBag,
  Calendar,
  Heart,
  History,
} from "lucide-react";

// Types
interface Mesures {
  // Haut du corps
  poitrine?: number;
  taille?: number;
  hanches?: number;
  epaules?: number;
  tourCou?: number;
  longueurDos?: number;
  // Bras
  longueurBras?: number;
  tourBras?: number;
  tourPoignet?: number;
  // Jambes
  longueurJambe?: number;
  tourCuisse?: number;
  tourMollet?: number;
  tourCheville?: number;
  // Autres
  carrure?: number;
  hauteurPoitrine?: number;
  ecartPoitrine?: number;
}

interface Client {
  id: string;
  nom: string;
  telephone: string;
  email?: string;
  adresse?: string;
  dateInscription: string;
  nombreCommandes: number;
  totalDepense: number;
  mesures?: Mesures;
  preferences?: {
    styles?: string[];
    tissus?: string[];
    couleurs?: string[];
  };
  notes?: string;
}

// Données mock
const clientsMock: Client[] = [
  {
    id: "1",
    nom: "Mme Kouadio Aya",
    telephone: "+225 07 00 00 01",
    email: "aya.kouadio@email.com",
    adresse: "Cocody, Abidjan",
    dateInscription: "2024-06-15",
    nombreCommandes: 8,
    totalDepense: 450000,
    mesures: {
      poitrine: 92,
      taille: 72,
      hanches: 98,
      longueurDos: 42,
      longueurBras: 58,
      tourBras: 28,
      tourCou: 36,
      epaules: 40,
      carrure: 38,
      hauteurPoitrine: 26,
      ecartPoitrine: 18,
    },
    preferences: {
      styles: ["Moderne", "Élégant"],
      tissus: ["Wax", "Soie"],
      couleurs: ["Bleu", "Or"],
    },
    notes: "Préfère les tissus wax. Taille bien les robes ajustées.",
  },
  {
    id: "2",
    nom: "M. Diallo Ibrahim",
    telephone: "+225 07 00 00 02",
    email: "ibrahim.diallo@email.com",
    adresse: "Plateau, Abidjan",
    dateInscription: "2024-08-20",
    nombreCommandes: 3,
    totalDepense: 285000,
    mesures: {
      poitrine: 102,
      taille: 88,
      hanches: 100,
      longueurDos: 46,
      longueurBras: 64,
      tourBras: 34,
      tourCou: 42,
      epaules: 48,
      longueurJambe: 108,
      tourCuisse: 58,
      carrure: 46,
    },
    preferences: {
      styles: ["Traditionnel", "Classique"],
      tissus: ["Bazin", "Coton"],
      couleurs: ["Blanc", "Bleu marine"],
    },
  },
  {
    id: "3",
    nom: "Mme Traoré Fatou",
    telephone: "+225 07 00 00 03",
    adresse: "Yopougon, Abidjan",
    dateInscription: "2024-10-05",
    nombreCommandes: 5,
    totalDepense: 180000,
    mesures: {
      poitrine: 88,
      taille: 68,
      hanches: 94,
      longueurDos: 40,
      epaules: 38,
    },
  },
  {
    id: "4",
    nom: "M. Koné Amadou",
    telephone: "+225 07 00 00 04",
    email: "amadou.kone@email.com",
    dateInscription: "2024-11-12",
    nombreCommandes: 2,
    totalDepense: 95000,
  },
  {
    id: "5",
    nom: "Mme Bamba Mariam",
    telephone: "+225 07 00 00 05",
    email: "mariam.bamba@email.com",
    adresse: "Marcory, Abidjan",
    dateInscription: "2024-03-22",
    nombreCommandes: 12,
    totalDepense: 780000,
    mesures: {
      poitrine: 96,
      taille: 76,
      hanches: 102,
      longueurDos: 43,
      longueurBras: 56,
      tourBras: 30,
      tourCou: 35,
      epaules: 41,
      longueurJambe: 100,
      tourCuisse: 54,
    },
    preferences: {
      styles: ["Luxueux", "Festif"],
      tissus: ["Dentelle", "Soie", "Wax"],
      couleurs: ["Rose", "Doré", "Vert"],
    },
    notes: "Cliente fidèle. Aime les broderies et les finitions soignées.",
  },
  {
    id: "6",
    nom: "M. Ouattara Seydou",
    telephone: "+225 07 00 00 06",
    dateInscription: "2024-12-01",
    nombreCommandes: 1,
    totalDepense: 85000,
    mesures: {
      poitrine: 98,
      taille: 84,
      hanches: 96,
      longueurDos: 45,
      epaules: 46,
      longueurBras: 62,
      tourCou: 40,
    },
  },
  {
    id: "7",
    nom: "Mme Sanogo Aminata",
    telephone: "+225 07 00 00 07",
    email: "aminata.sanogo@email.com",
    adresse: "Treichville, Abidjan",
    dateInscription: "2024-09-15",
    nombreCommandes: 4,
    totalDepense: 156000,
    mesures: {
      poitrine: 90,
      taille: 70,
      hanches: 96,
      longueurDos: 41,
      epaules: 39,
    },
  },
];

// Historique des commandes mock pour un client
const historiqueCommandesMock = [
  {
    id: "CMD-2024-015",
    article: "Robe de soirée",
    date: "2024-12-10",
    montant: 75000,
    statut: "livre",
  },
  {
    id: "CMD-2024-008",
    article: "Ensemble wax",
    date: "2024-10-22",
    montant: 45000,
    statut: "livre",
  },
  {
    id: "CMD-2024-003",
    article: "Jupe longue",
    date: "2024-08-15",
    montant: 28000,
    statut: "livre",
  },
];

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>(clientsMock);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isMesuresModalOpen, setIsMesuresModalOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const itemsPerPage = 10;

  // Filtrage
  const filteredClients = clients.filter((client) => {
    return (
      client.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.telephone.includes(searchTerm) ||
      client.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // Stats
  const stats = {
    total: clients.length,
    avecMesures: clients.filter(
      (c) => c.mesures && Object.keys(c.mesures).length > 0
    ).length,
    totalCommandes: clients.reduce((sum, c) => sum + c.nombreCommandes, 0),
    caTotal: clients.reduce((sum, c) => sum + c.totalDepense, 0),
  };

  const handleView = (client: Client) => {
    setSelectedClient(client);
    setIsViewModalOpen(true);
  };

  const handleEdit = (client: Client) => {
    setSelectedClient(client);
    setIsModalOpen(true);
  };

  const handleMesures = (client: Client) => {
    setSelectedClient(client);
    setIsMesuresModalOpen(true);
  };

  const handleDelete = (client: Client) => {
    setSelectedClient(client);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (selectedClient) {
      setClients(clients.filter((c) => c.id !== selectedClient.id));
      setIsDeleteModalOpen(false);
      setSelectedClient(null);
    }
  };

  const handleCreate = () => {
    setSelectedClient(null);
    setIsModalOpen(true);
  };

  // Composant pour afficher une mesure
  const MesureField = ({
    label,
    value,
    unit = "cm",
  }: {
    label: string;
    value?: number;
    unit?: string;
  }) => (
    <div className="flex justify-between items-center py-2 border-b border-[#B5E5E8] last:border-0">
      <span className="text-teal-600 text-sm">{label}</span>
      <span className="font-semibold text-teal-800">
        {value ? `${value} ${unit}` : "—"}
      </span>
    </div>
  );

  // Composant input mesure
  const MesureInput = ({
    label,
    name,
    defaultValue,
  }: {
    label: string;
    name: string;
    defaultValue?: number;
  }) => (
    <div>
      <Label className="text-teal-700 text-sm">{label} (cm)</Label>
      <Input
        type="number"
        name={name}
        className="mt-1 border-[#B5E5E8]"
        placeholder="—"
        defaultValue={defaultValue}
      />
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-teal-800">Clients</h1>
          <p className="text-teal-600 mt-1">
            Gérez votre fichier clients et leurs mesures
          </p>
        </div>
        <Button
          onClick={handleCreate}
          className="bg-teal-700 hover:bg-teal-600 text-white shadow-lg"
        >
          <Plus className="h-4 w-4 mr-2" />
          Nouveau client
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="kpi-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-teal-600">Total clients</p>
                <p className="text-2xl font-bold text-teal-800">
                  {stats.total}
                </p>
              </div>
              <div className="p-3 bg-teal-100 rounded-xl">
                <User className="h-6 w-6 text-teal-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="kpi-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-teal-600">Avec mesures</p>
                <p className="text-2xl font-bold text-teal-800">
                  {stats.avecMesures}
                </p>
              </div>
              <div className="p-3 bg-purple-100 rounded-xl">
                <Ruler className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="kpi-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-teal-600">Total commandes</p>
                <p className="text-2xl font-bold text-teal-800">
                  {stats.totalCommandes}
                </p>
              </div>
              <div className="p-3 bg-blue-100 rounded-xl">
                <ShoppingBag className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="kpi-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-emerald-600">CA Total</p>
                <p className="text-xl font-bold text-emerald-700">
                  {formatXOF(stats.caTotal)}
                </p>
              </div>
              <div className="p-3 bg-emerald-100 rounded-xl">
                <span className="text-emerald-600 font-bold text-sm">FCFA</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recherche */}
      <Card className="border border-[#B5E5E8] shadow-[0_10px_40px_-10px_rgba(83,176,183,0.3)]">
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-teal-500" />
            <Input
              placeholder="Rechercher par nom, téléphone ou email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-[#B5E5E8] focus:border-[#53B0B7] focus:ring-[#53B0B7]/30"
            />
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card className="border border-[#B5E5E8] shadow-[0_10px_40px_-10px_rgba(83,176,183,0.3)]">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gradient-to-r from-teal-700 to-teal-800 hover:from-teal-700 hover:to-teal-800">
                  <TableHead className="text-white font-bold">Client</TableHead>
                  <TableHead className="text-white font-bold">
                    Contact
                  </TableHead>
                  <TableHead className="text-white font-bold">
                    Commandes
                  </TableHead>
                  <TableHead className="text-white font-bold">
                    Total dépensé
                  </TableHead>
                  <TableHead className="text-white font-bold">
                    Mesures
                  </TableHead>
                  <TableHead className="text-white font-bold text-center">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredClients.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="text-center py-8 text-teal-600"
                    >
                      Aucun client trouvé
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredClients.map((client, index) => (
                    <TableRow
                      key={client.id}
                      className={`${
                        index % 2 === 0 ? "bg-white" : "bg-[#F0FAFA]"
                      } hover:bg-[#E0F5F6] transition-colors`}
                    >
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center text-white font-semibold text-sm">
                            {getInitials(client.nom)}
                          </div>
                          <div>
                            <p className="font-semibold text-teal-800">
                              {client.nom}
                            </p>
                            <p className="text-xs text-teal-600">
                              Depuis{" "}
                              {new Date(
                                client.dateInscription
                              ).toLocaleDateString("fr-FR", {
                                month: "short",
                                year: "numeric",
                              })}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <p className="text-teal-800 flex items-center gap-1 text-sm">
                            <Phone className="h-3 w-3" /> {client.telephone}
                          </p>
                          {client.email && (
                            <p className="text-xs text-teal-600 flex items-center gap-1">
                              <Mail className="h-3 w-3" /> {client.email}
                            </p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="font-semibold text-teal-800">
                          {client.nombreCommandes}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className="font-semibold text-teal-800">
                          {formatXOF(client.totalDepense)}
                        </span>
                      </TableCell>
                      <TableCell>
                        {client.mesures &&
                        Object.keys(client.mesures).length > 0 ? (
                          <Badge className="bg-emerald-500 text-white">
                            Complètes ({Object.keys(client.mesures).length})
                          </Badge>
                        ) : (
                          <Badge className="bg-amber-500 text-white">
                            À prendre
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center justify-center gap-1">
                          <button
                            className="btn-action btn-action-view"
                            onClick={() => handleView(client)}
                            title="Voir fiche"
                          >
                            <Eye size={16} />
                          </button>
                          <button
                            className="btn-action btn-action-edit"
                            onClick={() => handleEdit(client)}
                            title="Modifier"
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            className="btn-action btn-action-document"
                            onClick={() => handleMesures(client)}
                            title="Mesures"
                          >
                            <Ruler size={16} />
                          </button>
                          <button
                            className="btn-action btn-action-delete"
                            onClick={() => handleDelete(client)}
                            title="Supprimer"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
          <Pagination
            currentPage={currentPage}
            totalItems={filteredClients.length}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
          />
        </CardContent>
      </Card>

      {/* Modal Voir Client */}
      <Modal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        title="Fiche client"
        size="lg"
        variant="gradient"
      >
        {selectedClient && (
          <Tabs defaultValue="infos" className="w-full">
            <TabsList className="w-full justify-start border-b border-[#B5E5E8] bg-transparent p-0 mb-4">
              <TabsTrigger
                value="infos"
                className="data-[state=active]:border-b-2 data-[state=active]:border-teal-600 data-[state=active]:text-teal-800 rounded-none px-4 py-2"
              >
                Informations
              </TabsTrigger>
              <TabsTrigger
                value="mesures"
                className="data-[state=active]:border-b-2 data-[state=active]:border-teal-600 data-[state=active]:text-teal-800 rounded-none px-4 py-2"
              >
                Mesures
              </TabsTrigger>
              <TabsTrigger
                value="preferences"
                className="data-[state=active]:border-b-2 data-[state=active]:border-teal-600 data-[state=active]:text-teal-800 rounded-none px-4 py-2"
              >
                Préférences
              </TabsTrigger>
              <TabsTrigger
                value="historique"
                className="data-[state=active]:border-b-2 data-[state=active]:border-teal-600 data-[state=active]:text-teal-800 rounded-none px-4 py-2"
              >
                Historique
              </TabsTrigger>
            </TabsList>

            {/* Tab Informations */}
            <TabsContent value="infos" className="mt-0">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center text-white text-xl font-semibold">
                    {getInitials(selectedClient.nom)}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-teal-800">
                      {selectedClient.nom}
                    </h3>
                    <p className="text-teal-600">
                      Client depuis{" "}
                      {formatDateFR(selectedClient.dateInscription)}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#B5E5E8]">
                  <div className="space-y-1">
                    <p className="text-sm text-teal-600 flex items-center gap-1">
                      <Phone className="h-3 w-3" /> Téléphone
                    </p>
                    <p className="font-medium text-teal-800">
                      {selectedClient.telephone}
                    </p>
                  </div>
                  {selectedClient.email && (
                    <div className="space-y-1">
                      <p className="text-sm text-teal-600 flex items-center gap-1">
                        <Mail className="h-3 w-3" /> Email
                      </p>
                      <p className="font-medium text-teal-800">
                        {selectedClient.email}
                      </p>
                    </div>
                  )}
                  {selectedClient.adresse && (
                    <div className="col-span-2 space-y-1">
                      <p className="text-sm text-teal-600 flex items-center gap-1">
                        <MapPin className="h-3 w-3" /> Adresse
                      </p>
                      <p className="font-medium text-teal-800">
                        {selectedClient.adresse}
                      </p>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#B5E5E8]">
                  <div className="bg-[#F0FAFA] p-4 rounded-xl">
                    <p className="text-sm text-teal-600">Commandes</p>
                    <p className="text-2xl font-bold text-teal-800">
                      {selectedClient.nombreCommandes}
                    </p>
                  </div>
                  <div className="bg-[#F0FAFA] p-4 rounded-xl">
                    <p className="text-sm text-teal-600">Total dépensé</p>
                    <p className="text-xl font-bold text-teal-800">
                      {formatXOF(selectedClient.totalDepense)}
                    </p>
                  </div>
                </div>

                {selectedClient.notes && (
                  <div className="pt-4 border-t border-[#B5E5E8]">
                    <p className="text-sm text-teal-600 mb-2">Notes</p>
                    <p className="text-teal-700 bg-[#F0FAFA] p-3 rounded-lg">
                      {selectedClient.notes}
                    </p>
                  </div>
                )}
              </div>
            </TabsContent>

            {/* Tab Mesures */}
            <TabsContent value="mesures" className="mt-0">
              {selectedClient.mesures &&
              Object.keys(selectedClient.mesures).length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-teal-800 mb-3 flex items-center gap-2">
                      <User className="h-4 w-4" /> Haut du corps
                    </h4>
                    <div className="bg-[#F0FAFA] rounded-xl p-4">
                      <MesureField
                        label="Tour de poitrine"
                        value={selectedClient.mesures.poitrine}
                      />
                      <MesureField
                        label="Tour de taille"
                        value={selectedClient.mesures.taille}
                      />
                      <MesureField
                        label="Tour de hanches"
                        value={selectedClient.mesures.hanches}
                      />
                      <MesureField
                        label="Largeur épaules"
                        value={selectedClient.mesures.epaules}
                      />
                      <MesureField
                        label="Tour de cou"
                        value={selectedClient.mesures.tourCou}
                      />
                      <MesureField
                        label="Longueur dos"
                        value={selectedClient.mesures.longueurDos}
                      />
                      <MesureField
                        label="Carrure"
                        value={selectedClient.mesures.carrure}
                      />
                      <MesureField
                        label="Hauteur poitrine"
                        value={selectedClient.mesures.hauteurPoitrine}
                      />
                      <MesureField
                        label="Écart poitrine"
                        value={selectedClient.mesures.ecartPoitrine}
                      />
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-teal-800 mb-3">Bras</h4>
                      <div className="bg-[#F0FAFA] rounded-xl p-4">
                        <MesureField
                          label="Longueur bras"
                          value={selectedClient.mesures.longueurBras}
                        />
                        <MesureField
                          label="Tour de bras"
                          value={selectedClient.mesures.tourBras}
                        />
                        <MesureField
                          label="Tour poignet"
                          value={selectedClient.mesures.tourPoignet}
                        />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-teal-800 mb-3">
                        Jambes
                      </h4>
                      <div className="bg-[#F0FAFA] rounded-xl p-4">
                        <MesureField
                          label="Longueur jambe"
                          value={selectedClient.mesures.longueurJambe}
                        />
                        <MesureField
                          label="Tour de cuisse"
                          value={selectedClient.mesures.tourCuisse}
                        />
                        <MesureField
                          label="Tour mollet"
                          value={selectedClient.mesures.tourMollet}
                        />
                        <MesureField
                          label="Tour cheville"
                          value={selectedClient.mesures.tourCheville}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Ruler className="h-12 w-12 text-[#B5E5E8] mx-auto mb-3" />
                  <p className="text-teal-600 mb-4">
                    Aucune mesure enregistrée
                  </p>
                  <Button
                    className="bg-teal-700 hover:bg-teal-600 text-white"
                    onClick={() => {
                      setIsViewModalOpen(false);
                      setIsMesuresModalOpen(true);
                    }}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Prendre les mesures
                  </Button>
                </div>
              )}
            </TabsContent>

            {/* Tab Préférences */}
            <TabsContent value="preferences" className="mt-0">
              {selectedClient.preferences ? (
                <div className="space-y-4">
                  {selectedClient.preferences.styles &&
                    selectedClient.preferences.styles.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-teal-800 mb-2 flex items-center gap-2">
                          <Heart className="h-4 w-4" /> Styles favoris
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedClient.preferences.styles.map((style, i) => (
                            <Badge
                              key={i}
                              className="bg-pink-100 text-pink-700 border border-pink-300"
                            >
                              {style}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  {selectedClient.preferences.tissus &&
                    selectedClient.preferences.tissus.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-teal-800 mb-2">
                          Tissus préférés
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedClient.preferences.tissus.map((tissu, i) => (
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
                  {selectedClient.preferences.couleurs &&
                    selectedClient.preferences.couleurs.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-teal-800 mb-2">
                          Couleurs aimées
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedClient.preferences.couleurs.map(
                            (couleur, i) => (
                              <Badge
                                key={i}
                                className="bg-teal-100 text-teal-700 border border-teal-300"
                              >
                                {couleur}
                              </Badge>
                            )
                          )}
                        </div>
                      </div>
                    )}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Heart className="h-12 w-12 text-[#B5E5E8] mx-auto mb-3" />
                  <p className="text-teal-600">Aucune préférence enregistrée</p>
                </div>
              )}
            </TabsContent>

            {/* Tab Historique */}
            <TabsContent value="historique" className="mt-0">
              {selectedClient.nombreCommandes > 0 ? (
                <div className="space-y-3">
                  <h4 className="font-semibold text-teal-800 flex items-center gap-2">
                    <History className="h-4 w-4" /> Dernières commandes
                  </h4>
                  {historiqueCommandesMock.map((cmd) => (
                    <div
                      key={cmd.id}
                      className="flex items-center justify-between p-3 bg-[#F0FAFA] rounded-xl hover:bg-[#E0F5F6] transition-colors"
                    >
                      <div>
                        <p className="font-medium text-teal-800">
                          {cmd.article}
                        </p>
                        <p className="text-sm text-teal-600">
                          {cmd.id} • {formatDateFR(cmd.date)}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-teal-800">
                          {formatXOF(cmd.montant)}
                        </p>
                        <Badge className="bg-emerald-500 text-white text-xs">
                          Livré
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Calendar className="h-12 w-12 text-[#B5E5E8] mx-auto mb-3" />
                  <p className="text-teal-600">
                    Aucune commande pour ce client
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        )}
        <div className="mt-6">
          <ModalFooterButtons
            onCancel={() => setIsViewModalOpen(false)}
            cancelText="Fermer"
          />
        </div>
      </Modal>

      {/* Modal Mesures */}
      <Modal
        isOpen={isMesuresModalOpen}
        onClose={() => setIsMesuresModalOpen(false)}
        title={`Mesures - ${selectedClient?.nom || ""}`}
        size="lg"
        variant="gradient"
        footer={
          <ModalFooterButtons
            onCancel={() => setIsMesuresModalOpen(false)}
            onConfirm={() => setIsMesuresModalOpen(false)}
            cancelText="Annuler"
            confirmText="Enregistrer"
          />
        }
      >
        <div className="space-y-6">
          {/* Haut du corps */}
          <div>
            <h4 className="font-semibold text-teal-800 mb-3 flex items-center gap-2">
              <User className="h-4 w-4" /> Haut du corps
            </h4>
            <div className="grid grid-cols-3 gap-4">
              <MesureInput
                label="Tour poitrine"
                name="poitrine"
                defaultValue={selectedClient?.mesures?.poitrine}
              />
              <MesureInput
                label="Tour taille"
                name="taille"
                defaultValue={selectedClient?.mesures?.taille}
              />
              <MesureInput
                label="Tour hanches"
                name="hanches"
                defaultValue={selectedClient?.mesures?.hanches}
              />
              <MesureInput
                label="Largeur épaules"
                name="epaules"
                defaultValue={selectedClient?.mesures?.epaules}
              />
              <MesureInput
                label="Tour cou"
                name="tourCou"
                defaultValue={selectedClient?.mesures?.tourCou}
              />
              <MesureInput
                label="Écart poitrine"
                name="ecartPoitrine"
                defaultValue={selectedClient?.mesures?.ecartPoitrine}
              />
            </div>
          </div>

          {/* Bras */}
          <div>
            <h4 className="font-semibold text-teal-800 mb-3">Bras</h4>
            <div className="grid grid-cols-3 gap-4">
              <MesureInput
                label="Longueur bras"
                name="longueurBras"
                defaultValue={selectedClient?.mesures?.longueurBras}
              />
              <MesureInput
                label="Tour bras"
                name="tourBras"
                defaultValue={selectedClient?.mesures?.tourBras}
              />
              <MesureInput
                label="Tour poignet"
                name="tourPoignet"
                defaultValue={selectedClient?.mesures?.tourPoignet}
              />
            </div>
          </div>

          {/* Jambes */}
          <div>
            <h4 className="font-semibold text-teal-800 mb-3">Jambes</h4>
            <div className="grid grid-cols-3 gap-4">
              <MesureInput
                label="Longueur jambe"
                name="longueurJambe"
                defaultValue={selectedClient?.mesures?.longueurJambe}
              />
              <MesureInput
                label="Tour cuisse"
                name="tourCuisse"
                defaultValue={selectedClient?.mesures?.tourCuisse}
              />
              <MesureInput
                label="Tour mollet"
                name="tourMollet"
                defaultValue={selectedClient?.mesures?.tourMollet}
              />
              <MesureInput
                label="Tour cheville"
                name="tourCheville"
                defaultValue={selectedClient?.mesures?.tourCheville}
              />
            </div>
          </div>
        </div>
      </Modal>

      {/* Modal Créer/Modifier Client */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedClient ? "Modifier le client" : "Nouveau client"}
        size="md"
        variant="gradient"
        footer={
          <ModalFooterButtons
            onCancel={() => setIsModalOpen(false)}
            onConfirm={() => setIsModalOpen(false)}
            cancelText="Annuler"
            confirmText={selectedClient ? "Enregistrer" : "Créer"}
          />
        }
      >
        <div className="space-y-4">
          <div>
            <Label className="text-teal-700">Nom complet *</Label>
            <Input
              className="mt-1 border-[#B5E5E8]"
              placeholder="Ex: Mme Kouadio Aya"
              defaultValue={selectedClient?.nom}
            />
          </div>
          <div>
            <Label className="text-teal-700">Téléphone *</Label>
            <Input
              className="mt-1 border-[#B5E5E8]"
              placeholder="+225 07 00 00 00"
              defaultValue={selectedClient?.telephone}
            />
          </div>
          <div>
            <Label className="text-teal-700">Email</Label>
            <Input
              type="email"
              className="mt-1 border-[#B5E5E8]"
              placeholder="email@exemple.com"
              defaultValue={selectedClient?.email}
            />
          </div>
          <div>
            <Label className="text-teal-700">Adresse</Label>
            <Input
              className="mt-1 border-[#B5E5E8]"
              placeholder="Quartier, Ville"
              defaultValue={selectedClient?.adresse}
            />
          </div>
          <div>
            <Label className="text-teal-700">Notes</Label>
            <Textarea
              className="mt-1 border-[#B5E5E8]"
              placeholder="Préférences, remarques..."
              rows={3}
              defaultValue={selectedClient?.notes}
            />
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
          Êtes-vous sûr de vouloir supprimer le client{" "}
          <strong>{selectedClient?.nom}</strong> ? Toutes ses données seront
          perdues.
        </p>
      </Modal>
    </div>
  );
}
