'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar, Clock, MapPin, Car, Hotel, Phone, Heart } from 'lucide-react';
import MapEmbed from '@/components/MapEmbed';
import { useToast } from '@/components/ui/use-toast';

export default function HomePage() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    asistencia: '',
    acompanantes: '',
    alergias: '',
    transporte: false,
    alojamiento: false,
    comentarios: ''
  });

  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        toast({ title: '¡Confirmación enviada!', description: 'Gracias por confirmar tu asistencia.' });
        setFormData({ nombre: '', email: '', telefono: '', asistencia: '', acompanantes: '', alergias: '', transporte: false, alojamiento: false, comentarios: '' });
        setFormSubmitted(true);
      }
    } catch {
      toast({ title: 'Error', description: 'No se pudo enviar la confirmación.' });
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-gradient min-h-screen flex items-center justify-center text-center px-4">
        <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-sm rounded-3xl p-8 md:p-12">
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 drop-shadow-lg">
            Leire & Fran
          </h1>
          <p className="text-2xl md:text-3xl text-white/90 mb-8 drop-shadow-md">
            ¡Nos casamos!
          </p>
          <div className="space-y-4 md:space-y-0 md:space-x-4 md:flex md:justify-center">
            <Button 
              size="lg" 
              className="bg-white/90 hover:bg-white text-amber-800 px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
              onClick={() => document.getElementById('rsvp')?.scrollIntoView({ behavior: 'smooth' })}
            >
              💌 Confirmar Asistencia
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-white/80 text-white hover:bg-white/20 px-8 py-4 text-lg backdrop-blur-sm"
              onClick={() => document.getElementById('info')?.scrollIntoView({ behavior: 'smooth' })}
            >
              📍 Ver Información
            </Button>
          </div>
        </div>
      </section>

      {/* Cuándo y Dónde */}
      <section id="info" className="section-padding bg-gradient-to-br from-amber-50 to-white">
        <div className="container-max">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              Cuándo y Dónde
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
              Te esperamos para celebrar este día tan especial
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="space-y-6 md:space-y-8 px-4 md:px-0">
              <div className="flex items-start space-x-4">
                <Calendar className="w-6 h-6 md:w-8 md:h-8 text-amber-700 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">Fecha</h3>
                  <p className="text-gray-600 text-sm md:text-base">Sábado, 18 de abril de 2026</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Clock className="w-6 h-6 md:w-8 md:h-8 text-amber-700 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">Hora de la ceremonia</h3>
                  <p className="text-gray-600 font-medium text-base md:text-lg">12:30</p>
                  <p className="text-xs md:text-sm text-gray-500 mt-1">Por favor, llega 15 minutos antes</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <MapPin className="w-6 h-6 md:w-8 md:h-8 text-amber-700 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">Lugar</h3>
                  <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                    Hotel Restaurante Boabdil<br />
                    Carr. Bailén-Motril, s/n<br />
                    18630 Otura, Granada
                  </p>
                </div>
              </div>
            </div>

            <div>
              <MapEmbed />
            </div>
          </div>

          {/* Timeline */}
          <div className="mt-12 md:mt-16 bg-amber-50 rounded-2xl p-6 md:p-8 mx-4 md:mx-0">
            <h3 className="font-serif text-2xl md:text-3xl font-bold text-center text-gray-900 mb-6 md:mb-8">
              Programa del Día
            </h3>
            <div className="max-w-2xl mx-auto">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                <div className="text-center">
                  <div className="bg-amber-700 text-white rounded-full w-12 h-12 md:w-16 md:h-16 flex items-center justify-center mx-auto mb-2">
                    <span className="font-bold text-sm md:text-base">12:30</span>
                  </div>
                  <p className="font-medium text-sm md:text-base">Ceremonia</p>
                  <p className="text-xs md:text-sm text-gray-600">(jardines)</p>
                </div>
                <div className="text-center">
                  <div className="bg-amber-600 text-white rounded-full w-12 h-12 md:w-16 md:h-16 flex items-center justify-center mx-auto mb-2">
                    <span className="font-bold text-sm md:text-base">13:30</span>
                  </div>
                  <p className="font-medium text-sm md:text-base">Cóctel</p>
                  <p className="text-xs md:text-sm text-gray-600">brindis</p>
                </div>
                <div className="text-center">
                  <div className="bg-amber-500 text-white rounded-full w-12 h-12 md:w-16 md:h-16 flex items-center justify-center mx-auto mb-2">
                    <span className="font-bold text-sm md:text-base">15:00</span>
                  </div>
                  <p className="font-medium text-sm md:text-base">Banquete</p>
                  <p className="text-xs md:text-sm text-gray-600">comida</p>
                </div>
                <div className="text-center">
                  <div className="bg-amber-400 text-white rounded-full w-12 h-12 md:w-16 md:h-16 flex items-center justify-center mx-auto mb-2">
                    <span className="font-bold text-sm md:text-base">19:00</span>
                  </div>
                  <p className="font-medium text-sm md:text-base">Fiesta</p>
                  <p className="text-xs md:text-sm text-gray-600">baile</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Historia Resumida */}
      <section className="py-12 md:py-16 bg-gradient-to-br from-white to-amber-50">
        <div className="container-max px-4">
          <div className="text-center mb-8">
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Nuestra Historia
            </h2>
            <div className="max-w-2xl mx-auto bg-white rounded-xl p-4 md:p-6 shadow-sm">
              <Heart className="w-6 h-6 md:w-8 md:h-8 text-amber-700 mx-auto mb-4" />
              <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                Todo comenzó trabajando juntos en Casa de Campo. Entre platos y risas, el destino nos unió. 
                Leire sorprendió a Fran con la propuesta en casa, cerveza en mano. 
                Ahora celebramos nuestro amor en los jardines del Boabdil.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Transporte y Parking */}
      <section className="py-12 md:py-16 bg-gradient-to-br from-amber-50 to-white">
        <div className="container-max px-4">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Transporte y Parking
            </h2>
          </div>

          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6 md:gap-8">
            <div className="bg-gray-50 rounded-2xl p-6 md:p-8 text-center">
              <Phone className="w-8 h-8 md:w-12 md:h-12 text-amber-700 mx-auto mb-4" />
              <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-4">Taxis</h3>
              <div className="space-y-2">
                <p>
                  <a href="tel:958280000" className="text-amber-700 hover:text-amber-800 font-medium text-sm md:text-base">
                    958 28 00 00
                  </a>
                </p>
                <p>
                  <a href="tel:633214395" className="text-amber-700 hover:text-amber-800 font-medium text-sm md:text-base">
                    633 21 43 95
                  </a>
                </p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-6 md:p-8 text-center">
              <Car className="w-8 h-8 md:w-12 md:h-12 text-amber-700 mx-auto mb-4" />
              <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-4">Parking</h3>
              <p className="text-gray-600 text-sm md:text-base">
                El restaurante cuenta con un espacio muy amplio donde poder dejar los coches.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Alojamiento */}
      <section className="section-padding bg-gradient-to-br from-white to-amber-50">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Alojamiento
            </h2>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl p-8 text-center shadow-sm mb-8">
              <Hotel className="w-12 h-12 text-amber-700 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Hotel Restaurante Boabdil
              </h3>
              <p className="text-gray-600 mb-4">
                El propio restaurante facilita reservar habitaciones a <strong>precio especial para invitados</strong>.
              </p>
              <p className="text-sm text-gray-500">
                Además, en las inmediaciones existen otros alojamientos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 md:py-16 bg-gradient-to-br from-amber-50 to-white">
        <div className="container-max px-4">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Preguntas Frecuentes
            </h2>
          </div>

          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-4 md:gap-6">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="font-semibold text-amber-900 mb-3 flex items-center gap-2">
                <Clock className="w-5 h-5 text-amber-600" />
                ¿A qué hora empieza?
              </h3>
              <p className="text-gray-600">La ceremonia comenzará a las <strong>12:30</strong>. Te recomendamos llegar 15 minutos antes.</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="font-semibold text-amber-900 mb-3 flex items-center gap-2">
                <Car className="w-5 h-5 text-amber-600" />
                ¿Hay parking?
              </h3>
              <p className="text-gray-600">Sí, el restaurante cuenta con un amplio espacio de parking gratuito.</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="font-semibold text-amber-900 mb-3 flex items-center gap-2">
                <Hotel className="w-5 h-5 text-amber-600" />
                ¿Hay alojamiento?
              </h3>
              <p className="text-gray-600">Sí, el restaurante ofrece precio especial para invitados. También hay otros hoteles cercanos.</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="font-semibold text-amber-900 mb-3 flex items-center gap-2">
                <Phone className="w-5 h-5 text-amber-600" />
                ¿Cómo llego?
              </h3>
              <p className="text-gray-600">Puedes venir en coche (hay parking) o llamar a los taxis: 958 28 00 00 o 633 21 43 95.</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="font-semibold text-amber-900 mb-3 flex items-center gap-2">
                <span className="text-amber-600">🍽️</span>
                ¿Hay menú especial?
              </h3>
              <p className="text-gray-600">Sí, avisa en el formulario si tienes alergias o restricciones alimentarias.</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="font-semibold text-amber-900 mb-3 flex items-center gap-2">
                <span className="text-amber-600">👶</span>
                ¿Puedo traer niños?
              </h3>
              <p className="text-gray-600">¡Por supuesto! Indica el número de niños en el formulario de confirmación.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Formulario RSVP */}
      <section id="rsvp" className="py-16 md:py-20 bg-gradient-to-br from-amber-900 via-amber-800 to-amber-700">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-white mb-4">
              ¿Nos acompañas?
            </h2>
            <p className="text-lg md:text-xl text-amber-100">
              Confirma tu asistencia antes del 1 de marzo de 2026
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-12">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💍</span>
              </div>
              <h3 className="text-xl md:text-2xl font-serif font-bold text-amber-900 mb-2">Confirmación de Asistencia</h3>
              <p className="text-amber-700">Nos haría muy felices contar contigo</p>
            </div>
            
            {formSubmitted ? (
              <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 max-w-xl mx-auto text-center">
                <h3 className="text-3xl font-semibold text-amber-900 mb-6">¡Formulario enviado!</h3>
                <p className="text-amber-700 mb-6">Gracias por confirmar tu asistencia. Nos vemos en la boda.</p>
                <Button onClick={() => setFormSubmitted(false)} className="px-6 py-3 text-base md:text-lg">
                  Cerrar
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="nombre" className="text-amber-900 font-semibold flex items-center gap-2">
                      <span className="text-amber-600">👤</span> Nombre completo *
                    </Label>
                    <Input
                      id="nombre"
                      value={formData.nombre}
                      onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                      required
                      className="border-2 border-amber-200 focus:border-amber-500 focus:ring-amber-500/20 h-12 rounded-xl transition-all"
                      placeholder="Tu nombre completo"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-amber-900 font-semibold flex items-center gap-2">
                      <span className="text-amber-600">📧</span> Email *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      required
                      className="border-2 border-amber-200 focus:border-amber-500 focus:ring-amber-500/20 h-12 rounded-xl transition-all"
                      placeholder="tu@email.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label htmlFor="telefono" className="text-amber-900 font-semibold flex items-center gap-2">
                      <span className="text-amber-600">📱</span> Teléfono
                    </Label>
                    <Input
                      id="telefono"
                      value={formData.telefono}
                      onChange={(e) => setFormData({...formData, telefono: e.target.value})}
                      className="border-2 border-amber-200 focus:border-amber-500 focus:ring-amber-500/20 h-12 rounded-xl transition-all"
                      placeholder="123 456 789"
                    />
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="asistencia" className="text-amber-900 font-semibold flex items-center gap-2">
                      <span className="text-amber-600">✨</span> Asistencia *
                    </Label>
                    <Select value={formData.asistencia} onValueChange={(value) => setFormData({...formData, asistencia: value})} required>
                      <SelectTrigger className="border-2 border-amber-200 focus:border-amber-500 focus:ring-amber-500/20 h-12 rounded-xl transition-all">
                        <SelectValue placeholder="¿Podrás acompañarnos?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="si">🎉 Sí, asistiré</SelectItem>
                        <SelectItem value="no">😢 No podré asistir</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="acompanantes" className="text-amber-900 font-semibold flex items-center gap-2">
                    <span className="text-amber-600">👥</span> Número de acompañantes
                  </Label>
                  <Input
                    id="acompanantes"
                    type="number"
                    min="0"
                    max="10"
                    value={formData.acompanantes}
                    onChange={(e) => setFormData({...formData, acompanantes: e.target.value})}
                    className="border-2 border-amber-200 focus:border-amber-500 focus:ring-amber-500/20 h-12 rounded-xl transition-all"
                    placeholder="0"
                  />
                  <p className="text-sm text-amber-600">Incluye niños y adultos que te acompañarán</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="alergias" className="text-amber-900 font-semibold">Alergias o restricciones alimentarias</Label>
                  <Textarea
                    id="alergias"
                    value={formData.alergias}
                    onChange={(e) => setFormData({...formData, alergias: e.target.value})}
                    className="border-amber-200 focus:border-amber-500 focus:ring-amber-500 min-h-[80px]"
                    placeholder="Especifica cualquier alergia o restricción alimentaria..."
                  />
                </div>

                <div className="bg-amber-50 rounded-xl p-6 space-y-4">
                  <h3 className="font-semibold text-amber-900 mb-4">Información adicional</h3>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <Checkbox
                        id="transporte"
                        checked={formData.transporte}
                        onCheckedChange={(checked) => setFormData({...formData, transporte: checked as boolean})}
                        className="mt-1 border-amber-300 data-[state=checked]:bg-amber-600"
                      />
                      <Label htmlFor="transporte" className="text-amber-800 leading-relaxed">
                        Necesito información sobre transporte (taxis disponibles)
                      </Label>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Checkbox
                        id="alojamiento"
                        checked={formData.alojamiento}
                        onCheckedChange={(checked) => setFormData({...formData, alojamiento: checked as boolean})}
                        className="mt-1 border-amber-300 data-[state=checked]:bg-amber-600"
                      />
                      <Label htmlFor="alojamiento" className="text-amber-800 leading-relaxed">
                        Necesito información sobre alojamiento (precio especial para invitados)
                      </Label>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="comentarios" className="text-amber-900 font-semibold">Comentarios adicionales</Label>
                  <Textarea
                    id="comentarios"
                    value={formData.comentarios}
                    onChange={(e) => setFormData({...formData, comentarios: e.target.value})}
                    className="border-amber-200 focus:border-amber-500 focus:ring-amber-500 min-h-[100px]"
                    placeholder="Cualquier cosa que quieras decirnos..."
                  />
                </div>

                <div className="pt-4">
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-amber-600 via-amber-700 to-amber-800 hover:from-amber-700 hover:via-amber-800 hover:to-amber-900 text-white py-4 md:py-5 text-lg md:text-xl font-bold rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-300"
                  >
                    <span className="flex items-center justify-center gap-3">
                      💌 Enviar Confirmación 💌
                    </span>
                  </Button>
                  <p className="text-center text-sm text-amber-600 mt-4">
                    🔒 Tus datos están seguros y solo los usaremos para la boda
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}