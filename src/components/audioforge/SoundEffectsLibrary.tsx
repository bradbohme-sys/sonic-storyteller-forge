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
  Sparkles
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
    effects: [
      { name: 'Rain on Leaves', duration: '0:45', tags: ['weather', 'nature'] },
      { name: 'Ocean Waves', duration: '1:20', tags: ['water', 'peaceful'] },
      { name: 'Thunder Roll', duration: '0:08', tags: ['storm', 'dramatic'] },
      { name: 'Forest Ambience', duration: '2:30', tags: ['birds', 'nature'] },
      { name: 'Wind Through Trees', duration: '1:15', tags: ['wind', 'atmospheric'] }
    ]
  },
  { 
    id: 'mechanical', 
    name: 'Mechanical', 
    icon: Car, 
    color: 'from-blue-500 to-cyan-500',
    effects: [
      { name: 'Car Engine Start', duration: '0:12', tags: ['vehicle', 'engine'] },
      { name: 'Helicopter Blades', duration: '0:25', tags: ['aircraft', 'mechanical'] },
      { name: 'Factory Machinery', duration: '0:30', tags: ['industrial', 'machine'] },
      { name: 'Clock Ticking', duration: '0:05', tags: ['time', 'tension'] },
      { name: 'Gear Mechanisms', duration: '0:18', tags: ['mechanical', 'steampunk'] }
    ]
  },
  { 
    id: 'organic', 
    name: 'Organic', 
    icon: Heart, 
    color: 'from-pink-500 to-rose-500',
    effects: [
      { name: 'Footsteps on Gravel', duration: '0:08', tags: ['walking', 'footsteps'] },
      { name: 'Heartbeat', duration: '0:15', tags: ['body', 'tension'] },
      { name: 'Breathing Heavy', duration: '0:20', tags: ['human', 'exertion'] },
      { name: 'Eating Crunchy Food', duration: '0:12', tags: ['eating', 'texture'] },
      { name: 'Fabric Rustling', duration: '0:06', tags: ['clothing', 'movement'] }
    ]
  },
  { 
    id: 'action', 
    name: 'Action', 
    icon: Swords, 
    color: 'from-red-500 to-orange-500',
    effects: [
      { name: 'Sword Clashing', duration: '0:03', tags: ['combat', 'metal'] },
      { name: 'Explosion Impact', duration: '0:08', tags: ['explosion', 'dramatic'] },
      { name: 'Arrow Whoosh', duration: '0:02', tags: ['projectile', 'speed'] },
      { name: 'Glass Breaking', duration: '0:04', tags: ['destruction', 'impact'] },
      { name: 'Running Sprint', duration: '0:10', tags: ['running', 'chase'] }
    ]
  },
  { 
    id: 'fantasy', 
    name: 'Fantasy', 
    icon: Sparkles, 
    color: 'from-purple-500 to-indigo-500',
    effects: [
      { name: 'Magic Spell Cast', duration: '0:06', tags: ['magic', 'fantasy'] },
      { name: 'Dragon Roar', duration: '0:12', tags: ['creature', 'monster'] },
      { name: 'Portal Opening', duration: '0:08', tags: ['teleport', 'mystical'] },
      { name: 'Enchanted Chimes', duration: '0:15', tags: ['magical', 'peaceful'] },
      { name: 'Potion Bubbling', duration: '0:20', tags: ['alchemy', 'mystery'] }
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
              <span>Sound Effects Library</span>
            </CardTitle>
            <CardDescription>
              Browse and generate professional sound effects for your audio projects
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
                  placeholder="Search sound effects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="console">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>

            {/* Tag Filters */}
            <div className="flex flex-wrap gap-2">
              {allTags.slice(0, 10).map((tag) => (
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
          <TabsList className="grid w-full grid-cols-5 bg-card/50 backdrop-blur-sm">
            {SFX_CATEGORIES.map((category) => {
              const Icon = category.icon;
              return (
                <TabsTrigger 
                  key={category.id} 
                  value={category.id}
                  className="data-[state=active]:bg-gradient-primary data-[state=active]:text-white"
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {category.name}
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
                    <CardTitle className="flex items-center space-x-2">
                      <div className={`w-8 h-8 bg-gradient-to-r ${category.color} rounded-lg flex items-center justify-center`}>
                        <Icon className="w-4 h-4 text-white" />
                      </div>
                      <span>{category.name} Effects</span>
                    </CardTitle>
                    <CardDescription>
                      Professional {category.name.toLowerCase()} sound effects
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {category.effects.map((effect, index) => (
                        <motion.div
                          key={effect.name}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <Card className="hover-audio group cursor-pointer">
                            <CardContent className="p-4">
                              <div className="flex items-center justify-between mb-3">
                                <h4 className="font-medium text-sm">{effect.name}</h4>
                                <span className="text-xs text-muted-foreground">{effect.duration}</span>
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
              <span>Generate Custom SFX</span>
            </CardTitle>
            <CardDescription>
              Create unique sound effects using AI generation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="waveform" className="h-20 flex-col">
                <Zap className="w-6 h-6 mb-2" />
                Generate from Text
              </Button>
              <Button variant="spectrum" className="h-20 flex-col">
                <Volume2 className="w-6 h-6 mb-2" />
                Audio Enhancer
              </Button>
              <Button variant="console" className="h-20 flex-col">
                <Sparkles className="w-6 h-6 mb-2" />
                Style Transfer
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}