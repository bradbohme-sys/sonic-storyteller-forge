import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Volume2, 
  Search, 
  Play, 
  Download, 
  Filter,
  Zap,
  TreePine,
  Car,
  Heart,
  Swords,
  Sparkles,
  Building,
  Waves,
  Wind,
  Flame,
  Footprints,
  Hammer,
  Users,
  Gamepad2,
  Music2,
  Clock,
  Skull,
  Megaphone,
  Home
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const SFX_CATEGORIES = [
  { 
    id: 'environmental', 
    name: 'Environmental', 
    icon: TreePine, 
    color: 'from-green-500 to-emerald-500',
    image: '/api/placeholder/300/200?text=Forest+Scene',
    effects: [
      { name: 'Rain on Leaves', duration: '0:45', tags: ['weather', 'nature'], image: '/api/placeholder/150/100?text=Rain' },
      { name: 'Ocean Waves', duration: '1:20', tags: ['water', 'peaceful'], image: '/api/placeholder/150/100?text=Ocean' },
      { name: 'Thunder Roll', duration: '0:08', tags: ['storm', 'dramatic'], image: '/api/placeholder/150/100?text=Thunder' },
      { name: 'Forest Ambience', duration: '2:30', tags: ['birds', 'nature'], image: '/api/placeholder/150/100?text=Forest' },
      { name: 'Wind Through Trees', duration: '1:15', tags: ['wind', 'atmospheric'], image: '/api/placeholder/150/100?text=Wind' }
    ]
  },
  { 
    id: 'mechanical', 
    name: 'Mechanical', 
    icon: Car, 
    color: 'from-blue-500 to-cyan-500',
    image: '/api/placeholder/300/200?text=Machinery',
    effects: [
      { name: 'Car Engine Start', duration: '0:12', tags: ['vehicle', 'engine'], image: '/api/placeholder/150/100?text=Engine' },
      { name: 'Helicopter Blades', duration: '0:25', tags: ['aircraft', 'mechanical'], image: '/api/placeholder/150/100?text=Helicopter' },
      { name: 'Factory Machinery', duration: '0:30', tags: ['industrial', 'machine'], image: '/api/placeholder/150/100?text=Factory' },
      { name: 'Clock Ticking', duration: '0:05', tags: ['time', 'tension'], image: '/api/placeholder/150/100?text=Clock' },
      { name: 'Door Hinge Creak', duration: '0:03', tags: ['door', 'creaking'], image: '/api/placeholder/150/100?text=Door' },
      { name: 'Gear Mechanisms', duration: '0:18', tags: ['mechanical', 'steampunk'], image: '/api/placeholder/150/100?text=Gears' }
    ]
  },
  { 
    id: 'organic', 
    name: 'Organic', 
    icon: Heart, 
    color: 'from-pink-500 to-rose-500',
    image: '/api/placeholder/300/200?text=Human+Sounds',
    effects: [
      { name: 'Footsteps on Gravel', duration: '0:08', tags: ['walking', 'footsteps'], image: '/api/placeholder/150/100?text=Footsteps' },
      { name: 'Heartbeat', duration: '0:15', tags: ['body', 'tension'], image: '/api/placeholder/150/100?text=Heartbeat' },
      { name: 'Breathing Heavy', duration: '0:20', tags: ['human', 'exertion'], image: '/api/placeholder/150/100?text=Breathing' },
      { name: 'Eating Crunchy Food', duration: '0:12', tags: ['eating', 'texture'], image: '/api/placeholder/150/100?text=Eating' },
      { name: 'Fabric Rustling', duration: '0:06', tags: ['clothing', 'movement'], image: '/api/placeholder/150/100?text=Fabric' },
      { name: 'Leather Sofa Creak', duration: '0:04', tags: ['furniture', 'leather'], image: '/api/placeholder/150/100?text=Leather' }
    ]
  },
  { 
    id: 'action', 
    name: 'Action', 
    icon: Swords, 
    color: 'from-red-500 to-orange-500',
    image: '/api/placeholder/300/200?text=Action+Scene',
    effects: [
      { name: 'Sword Clashing', duration: '0:03', tags: ['combat', 'metal'], image: '/api/placeholder/150/100?text=Swords' },
      { name: 'Explosion Impact', duration: '0:08', tags: ['explosion', 'dramatic'], image: '/api/placeholder/150/100?text=Explosion' },
      { name: 'Arrow Whoosh', duration: '0:02', tags: ['projectile', 'speed'], image: '/api/placeholder/150/100?text=Arrow' },
      { name: 'Glass Breaking', duration: '0:04', tags: ['destruction', 'impact'], image: '/api/placeholder/150/100?text=Glass' },
      { name: 'Running Sprint', duration: '0:10', tags: ['running', 'chase'], image: '/api/placeholder/150/100?text=Running' },
      { name: 'Punch Impact', duration: '0:02', tags: ['fight', 'impact'], image: '/api/placeholder/150/100?text=Punch' }
    ]
  },
  { 
    id: 'fantasy', 
    name: 'Fantasy', 
    icon: Sparkles, 
    color: 'from-purple-500 to-indigo-500',
    image: '/api/placeholder/300/200?text=Magic+Scene',
    effects: [
      { name: 'Magic Spell Cast', duration: '0:06', tags: ['magic', 'fantasy'], image: '/api/placeholder/150/100?text=Magic' },
      { name: 'Dragon Roar', duration: '0:12', tags: ['creature', 'monster'], image: '/api/placeholder/150/100?text=Dragon' },
      { name: 'Portal Opening', duration: '0:08', tags: ['teleport', 'mystical'], image: '/api/placeholder/150/100?text=Portal' },
      { name: 'Enchanted Chimes', duration: '0:15', tags: ['magical', 'peaceful'], image: '/api/placeholder/150/100?text=Chimes' },
      { name: 'Potion Bubbling', duration: '0:20', tags: ['alchemy', 'mystery'], image: '/api/placeholder/150/100?text=Potion' }
    ]
  },
  { 
    id: 'urban', 
    name: 'Urban', 
    icon: Building, 
    color: 'from-gray-500 to-slate-500',
    image: '/api/placeholder/300/200?text=City+Scene',
    effects: [
      { name: 'Traffic Ambience', duration: '2:00', tags: ['city', 'traffic'], image: '/api/placeholder/150/100?text=Traffic' },
      { name: 'Subway Train', duration: '0:45', tags: ['transport', 'urban'], image: '/api/placeholder/150/100?text=Subway' },
      { name: 'Construction Site', duration: '1:30', tags: ['building', 'tools'], image: '/api/placeholder/150/100?text=Construction' },
      { name: 'Police Sirens', duration: '0:20', tags: ['emergency', 'siren'], image: '/api/placeholder/150/100?text=Police' },
      { name: 'Elevator Ding', duration: '0:02', tags: ['building', 'mechanical'], image: '/api/placeholder/150/100?text=Elevator' }
    ]
  },
  { 
    id: 'horror', 
    name: 'Horror', 
    icon: Skull, 
    color: 'from-red-800 to-black',
    image: '/api/placeholder/300/200?text=Horror+Scene',
    effects: [
      { name: 'Creaking Floorboards', duration: '0:08', tags: ['creepy', 'wood'], image: '/api/placeholder/150/100?text=Floorboards' },
      { name: 'Ghostly Whispers', duration: '0:15', tags: ['supernatural', 'voice'], image: '/api/placeholder/150/100?text=Whispers' },
      { name: 'Howling Wind', duration: '1:00', tags: ['atmospheric', 'scary'], image: '/api/placeholder/150/100?text=Howling' },
      { name: 'Chain Rattling', duration: '0:06', tags: ['metal', 'chains'], image: '/api/placeholder/150/100?text=Chains' },
      { name: 'Scream Echo', duration: '0:04', tags: ['human', 'terror'], image: '/api/placeholder/150/100?text=Scream' }
    ]
  },
  { 
    id: 'cinematic', 
    name: 'Cinematic', 
    icon: Music2, 
    color: 'from-yellow-500 to-orange-500',
    image: '/api/placeholder/300/200?text=Movie+Scene',
    effects: [
      { name: 'Epic Bass Drop', duration: '0:03', tags: ['trailer', 'epic'], image: '/api/placeholder/150/100?text=Bass+Drop' },
      { name: 'Prometheus Reverb', duration: '0:12', tags: ['prometheus', 'cinematic'], image: '/api/placeholder/150/100?text=Prometheus' },
      { name: 'Inception Horn', duration: '0:08', tags: ['inception', 'dramatic'], image: '/api/placeholder/150/100?text=Inception' },
      { name: 'Tension String Swell', duration: '0:15', tags: ['tension', 'strings'], image: '/api/placeholder/150/100?text=Strings' },
      { name: 'Cinematic Whoosh', duration: '0:05', tags: ['transition', 'whoosh'], image: '/api/placeholder/150/100?text=Whoosh' }
    ]
  },
  { 
    id: 'domestic', 
    name: 'Domestic', 
    icon: Home, 
    color: 'from-orange-500 to-yellow-500',
    image: '/api/placeholder/300/200?text=Home+Scene',
    effects: [
      { name: 'Microwave Beep', duration: '0:01', tags: ['appliance', 'kitchen'], image: '/api/placeholder/150/100?text=Microwave' },
      { name: 'Coffee Brewing', duration: '0:30', tags: ['kitchen', 'morning'], image: '/api/placeholder/150/100?text=Coffee' },
      { name: 'TV Channel Change', duration: '0:02', tags: ['television', 'remote'], image: '/api/placeholder/150/100?text=TV' },
      { name: 'Vacuum Cleaner', duration: '0:25', tags: ['cleaning', 'appliance'], image: '/api/placeholder/150/100?text=Vacuum' },
      { name: 'Toilet Flush', duration: '0:08', tags: ['bathroom', 'water'], image: '/api/placeholder/150/100?text=Toilet' }
    ]
  }
];

export function SoundEffectsLibrary() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('environmental');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const allTags = [...new Set(
    SFX_CATEGORIES.flatMap(cat => 
      cat.effects.flatMap(effect => effect.tags)
    )
  )];

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const filteredEffects = SFX_CATEGORIES.find(cat => cat.id === selectedCategory)?.effects.filter(effect => {
    const matchesSearch = effect.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         effect.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesTags = selectedTags.length === 0 || 
                       selectedTags.some(tag => effect.tags.includes(tag));
    return matchesSearch && matchesTags;
  }) || [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card className="console-inset">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-audio-glow">
              <Volume2 className="w-6 h-6" />
              <span>Professional Sound Effects Library</span>
            </CardTitle>
            <CardDescription>
              Comprehensive collection of high-quality sound effects with cinematic-grade audio samples
            </CardDescription>
          </CardHeader>
        </Card>
      </motion.div>

      {/* Search & Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="hover-audio">
          <CardContent className="pt-6">
            <div className="flex space-x-4 mb-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search sound effects... (e.g., 'epic bass', 'footsteps', 'door creak')"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="console">
                <Filter className="w-4 h-4 mr-2" />
                Advanced Filter
              </Button>
            </div>

            {/* Tag Filters */}
            <div className="flex flex-wrap gap-2">
              {allTags.slice(0, 15).map((tag) => (
                <Badge
                  key={tag}
                  variant={selectedTags.includes(tag) ? "default" : "outline"}
                  className={`cursor-pointer transition-all hover-audio ${
                    selectedTags.includes(tag) 
                      ? 'bg-gradient-primary text-white hover:shadow-audio-glow' 
                      : 'hover:bg-primary/10'
                  }`}
                  onClick={() => toggleTag(tag)}
                >
                  {tag}
                </Badge>
              ))}
              {selectedTags.length > 0 && (
                <Button 
                  size="sm" 
                  variant="ghost" 
                  onClick={() => setSelectedTags([])}
                  className="h-6 px-2 text-xs"
                >
                  Clear ({selectedTags.length})
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* SFX Categories */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-9 bg-card/50 backdrop-blur-sm">
            {SFX_CATEGORIES.map((category) => {
              const Icon = category.icon;
              return (
                <TabsTrigger 
                  key={category.id} 
                  value={category.id}
                  className="data-[state=active]:bg-gradient-primary data-[state=active]:text-white text-xs"
                >
                  <Icon className="w-4 h-4 mr-1" />
                  <span className="hidden sm:inline">{category.name}</span>
                </TabsTrigger>
              );
            })}
          </TabsList>

          {SFX_CATEGORIES.map((category) => {
            const Icon = category.icon;
            return (
              <TabsContent key={category.id} value={category.id}>
                <Card className="hover-audio">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-12 h-12 bg-gradient-to-r ${category.color} rounded-lg flex items-center justify-center`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <CardTitle className="flex items-center space-x-2">
                            <span>{category.name} Effects</span>
                          </CardTitle>
                          <CardDescription>
                            Professional {category.name.toLowerCase()} sound effects collection
                          </CardDescription>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="text-sm text-muted-foreground">
                          {filteredEffects.length} of {category.effects.length} effects
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {searchTerm && `Filtered by: "${searchTerm}"`}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {filteredEffects.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredEffects.map((effect, index) => (
                          <motion.div
                            key={effect.name}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                          >
                            <Card className="hover-audio group cursor-pointer overflow-hidden">
                              <div className="relative h-24 bg-gradient-to-r from-accent/50 to-accent/30 flex items-center justify-center">
                                <div className="absolute inset-0 bg-black/20"></div>
                                <div className="relative z-10 text-center">
                                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-1">
                                    <Play className="w-4 h-4 text-white" />
                                  </div>
                                  <div className="text-xs text-white/80">{effect.duration}</div>
                                </div>
                              </div>
                              
                              <CardContent className="p-4">
                                <div className="flex items-center justify-between mb-3">
                                  <h4 className="font-medium text-sm">{effect.name}</h4>
                                </div>
                                
                                <div className="flex flex-wrap gap-1 mb-3">
                                  {effect.tags.map((tag) => (
                                    <Badge key={tag} variant="secondary" className="text-xs">
                                      {tag}
                                    </Badge>
                                  ))}
                                </div>

                                <div className="flex space-x-2">
                                  <Button size="sm" variant="play" className="flex-1">
                                    <Play className="w-3 h-3 mr-1" />
                                    Play
                                  </Button>
                                  <Button size="sm" variant="ghost">
                                    <Download className="w-3 h-3" />
                                  </Button>
                                </div>
                              </CardContent>
                            </Card>
                          </motion.div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-muted-foreground">
                        <Volume2 className="w-12 h-12 mx-auto mb-4 opacity-50" />
                        <p>No effects match your search criteria</p>
                        <p className="text-xs mt-2">Try adjusting your search terms or selected tags</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            );
          })}
        </Tabs>
      </motion.div>

      {/* Generate Custom SFX */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="hover-audio">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Zap className="w-5 h-5 text-primary" />
              <span>AI Sound Generation Studio</span>
            </CardTitle>
            <CardDescription>
              Create unique sound effects using advanced AI generation and audio processing
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Button variant="waveform" className="h-20 flex-col space-y-2">
                <Zap className="w-6 h-6" />
                <span className="text-sm">Generate from Text</span>
                <span className="text-xs opacity-70">AI text-to-audio</span>
              </Button>
              <Button variant="spectrum" className="h-20 flex-col space-y-2">
                <Volume2 className="w-6 h-6" />
                <span className="text-sm">Audio Enhancer</span>
                <span className="text-xs opacity-70">Improve quality</span>
              </Button>
              <Button variant="console" className="h-20 flex-col space-y-2">
                <Sparkles className="w-6 h-6" />
                <span className="text-sm">Style Transfer</span>
                <span className="text-xs opacity-70">Change characteristics</span>
              </Button>
              <Button variant="audio" className="h-20 flex-col space-y-2">
                <Music2 className="w-6 h-6" />
                <span className="text-sm">Layer Mixer</span>
                <span className="text-xs opacity-70">Combine effects</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}