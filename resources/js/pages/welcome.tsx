import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';

// Import shadcn/ui components
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

// Import app components
import AppLogo from '@/components/app-logo';

// Import icons
import {  ChevronRight, Brain, Users, BarChart3, Zap, Github, Code, Terminal, Database,RefreshCw } from 'lucide-react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;
    return (
        <>
            <Head title="MENA Devs">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            
            <div className="relative min-h-screen overflow-x-hidden bg-background">
                {/* Header without border */}
                <header className="sticky top-0 z-40 w-full bg-background/80 backdrop-blur-md">
                    <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
                        <motion.div 
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            className="flex items-center gap-3"
                        >
                            <div className="flex items-center">
                                <AppLogo />
                            </div>
                        </motion.div>
                        
                        <motion.nav 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3, duration: 0.6 }}
                            className="flex items-center gap-4"
                        >
                            <div className="hidden gap-1 md:flex">
                                <Button asChild variant="ghost" size="sm">
                                    <a href="#features">Features</a>
                                </Button>
                                <Button asChild variant="ghost" size="sm">
                                    <a href="#how-it-works">How It Works</a>
                                </Button>
                                <Button asChild variant="ghost" size="sm">
                                    <a href="#testimonials">Testimonials</a>
                                </Button>
                                <Button asChild variant="ghost" size="sm">
                                    <a href="#integrations">Integrations</a>
                                </Button>
                            </div>
                            
                        {auth.user ? (
                                <Button asChild variant="default">
                                    <Link href={route('dashboard')}>
                                Dashboard
                            </Link>
                                </Button>
                        ) : (
                            <>
                                    <Button asChild variant="ghost">
                                        <Link href={route('login')}>
                                    Log in
                                </Link>
                                    </Button>
                                    <Button asChild variant="default">
                                        <Link href={route('register')}>
                                    Register
                                </Link>
                                    </Button>
                            </>
                        )}
                        </motion.nav>
                    </div>
                </header>
       
                {/* Hero Section with Interactive Brain Visualization */}
                <section className="relative flex min-h-[90vh] items-center justify-center overflow-hidden">
                    {/* Dynamic background gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-background"></div>
                    
                    {/* Animated circles background */}
                    <div className="absolute inset-0 overflow-hidden">
                        {[...Array(6)].map((_, i) => (
                            <motion.div 
                                key={i}
                                className="absolute rounded-full bg-primary/5"
                                initial={{ 
                                    width: `${Math.random() * 300 + 100}px`, 
                                    height: `${Math.random() * 300 + 100}px`,
                                    x: `${Math.random() * 100}%`, 
                                    y: `${Math.random() * 100}%`,
                                    opacity: 0.3
                                }}
                                animate={{ 
                                    x: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
                                    y: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
                                    opacity: [0.2, 0.5, 0.2]
                                }}
                                transition={{ 
                                    duration: Math.random() * 20 + 15, 
                                    repeat: Infinity,
                                    repeatType: "reverse"
                                }}
                            />
                        ))}
                    </div>
                    
                    <div className="container relative z-10 mx-auto px-4 py-16 sm:px-6 sm:py-24">
                        <div className="flex flex-col items-center justify-center text-center">
                            {/* Modern Badge */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                                className="mb-8"
                            >
                                <Badge variant="outline" className="px-4 py-2 text-sm backdrop-blur-sm border-primary/20">
                                    <span className="mr-2 inline-block h-2 w-2 rounded-full bg-primary animate-pulse"></span>
                                    Reinforcement Learning from Human Feedback
                                </Badge>
                            </motion.div>
                            
                            {/* Main heading with animated gradient */}
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="mb-6 max-w-4xl text-center text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
                            >
                                Fine-tune AI Models with{' '}
                                <span className="relative inline-block">
                                    <span className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text blur-sm"></span>
                                    <span className="relative bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">Human Feedback</span>
                                </span>
                            </motion.h1>
                            
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.4 }}
                                className="mb-10 max-w-2xl text-center text-lg text-muted-foreground"
                            >
                                Train language models that align perfectly with human preferences and values through our comprehensive RLHF platform.
                            </motion.p>
                            
                            {/* Feature points in a horizontal layout */}
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.6 }}
                                className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-3 max-w-4xl"
                            >
                                {[
                                    {
                                        icon: <Users className="h-5 w-5 text-primary" />,
                                        text: "Collect high-quality human feedback at scale"
                                    },
                                    {
                                        icon: <BarChart3 className="h-5 w-5 text-primary" />,
                                        text: "Train reward models based on human preferences"
                                    },
                                    {
                                        icon: <Zap className="h-5 w-5 text-primary" />,
                                        text: "Optimize models using reinforcement learning"
                                    }
                                ].map((feature, index) => (
                                    <div key={index} className="flex items-center gap-3 rounded-lg border border-border/30 bg-card/30 p-4 backdrop-blur-sm">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                                            {feature.icon}
                                        </div>
                                        <p className="text-sm font-medium">{feature.text}</p>
                                    </div>
                                ))}
                            </motion.div>
                            
                            {/* CTA Buttons */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 1 }}
                                className="flex flex-wrap justify-center gap-4"
                            >
                                <Button asChild size="lg" className="relative overflow-hidden group">
                                    <Link href={auth.user ? route('dashboard') : route('register')}>
                                        <span className="relative z-10">Get Started</span>
                                        <span className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80 group-hover:opacity-90 transition-opacity"></span>
                                    </Link>
                                </Button>
                                <Button asChild variant="outline" size="lg" className="border-primary/30 hover:border-primary/70">
                                    <a href="#features">
                                        Learn More
                                    </a>
                                </Button>
                            </motion.div>
                            
                            {/* Technology badges */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 1.2 }}
                                className="mt-10 flex flex-wrap justify-center gap-2"
                            >
                                {["Python", "TensorFlow", "PyTorch", "JAX", "REST API"].map((tech, index) => (
                                    <Badge key={index} variant="secondary" className="bg-card/40 backdrop-blur-sm">
                                        {tech}
                                    </Badge>
                                ))}
                            </motion.div>
                        </div>
                    </div>
                </section>
                
                {/* Features Section */}
                <section id="features" className="bg-muted/40 py-20">
                    <div className="container mx-auto px-4 sm:px-6">
                        <div className="mb-12 text-center">
                            <Badge variant="outline" className="mb-4">Features</Badge>
                            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">Everything You Need for RLHF</h2>
                            <p className="mx-auto max-w-2xl text-muted-foreground">
                                Our platform provides all the tools necessary to implement Reinforcement Learning from Human Feedback at scale.
                            </p>
                        </div>
                        
                        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                            {[
                                {
                                    icon: <Brain className="h-10 w-10 text-primary" />,
                                    title: "Human Feedback Collection",
                                    description: "Intuitive interfaces for gathering high-quality human feedback on AI outputs with customizable rating systems and annotation tools."
                                },
                                {
                                    icon: <Zap className="h-10 w-10 text-primary" />,
                                    title: "Advanced Fine-tuning",
                                    description: "State-of-the-art RLHF algorithms to optimize models based on collected feedback with support for various model architectures."
                                },
                                {
                                    icon: <BarChart3 className="h-10 w-10 text-primary" />,
                                    title: "Performance Analytics",
                                    description: "Comprehensive metrics and visualizations to track model improvement over time with detailed reports and insights."
                                }
                            ].map((feature, index) => (
                                <Card key={index} className="border-0 bg-card/50">
                                    <CardHeader>
                                        <div className="mb-4">{feature.icon}</div>
                                        <CardTitle>{feature.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-muted-foreground">{feature.description}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>
                
                {/* How It Works Section - Modern Visual Design */}
                <section id="how-it-works" className="py-24 overflow-hidden bg-gradient-to-b from-background to-muted/30">
                    <div className="container mx-auto px-4 sm:px-6">
                        <div className="mb-16 text-center">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                                viewport={{ once: true }}
                            >
                                <Badge variant="outline" className="mb-4 px-3 py-1">Process</Badge>
                                <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                                    How <span className="text-primary">RLHF</span> Works
                                </h2>
                                <p className="mx-auto max-w-2xl text-muted-foreground">
                                    Understanding the process of Reinforcement Learning from Human Feedback
                                </p>
                            </motion.div>
                        </div>
                        
                        {/* Modern Hexagon Flow */}
                        <div className="relative mx-auto max-w-5xl">
                            {/* Connecting lines */}
                            <svg className="absolute inset-0 h-full w-full" style={{ zIndex: 0 }}>
                                <defs>
                                    <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.1" />
                                        <stop offset="50%" stopColor="var(--primary)" stopOpacity="0.5" />
                                        <stop offset="100%" stopColor="var(--primary)" stopOpacity="0.1" />
                                    </linearGradient>
                                </defs>
                                <motion.path 
                                    d="M150,100 L350,180 L550,100 L750,180 L950,100" 
                                    stroke="url(#lineGradient)" 
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                    fill="none"
                                    initial={{ pathLength: 0, opacity: 0 }}
                                    whileInView={{ pathLength: 1, opacity: 1 }}
                                    transition={{ duration: 1.5, ease: "easeInOut" }}
                                    viewport={{ once: true }}
                                />
                            </svg>
                            
                            {/* Process steps in hexagon cards */}
                            <div className="relative z-10 grid grid-cols-1 gap-12 md:grid-cols-3 lg:grid-cols-5">
                                {[
                                    {
                                        step: "01",
                                        title: "Initial Model",
                                        description: "Start with a pre-trained language model as the foundation",
                                        icon: <Brain className="h-8 w-8" />,
                                        delay: 0
                                    },
                                    {
                                        step: "02",
                                        title: "Generate Responses",
                                        description: "Create diverse outputs from various prompts",
                                        icon: <Code className="h-8 w-8" />,
                                        delay: 0.2
                                    },
                                    {
                                        step: "03",
                                        title: "Human Feedback",
                                        description: "Collect ratings and rankings from human evaluators",
                                        icon: <Users className="h-8 w-8" />,
                                        delay: 0.4
                                    },
                                    {
                                        step: "04",
                                        title: "Reward Model",
                                        description: "Train a model to predict human preferences",
                                        icon: <BarChart3 className="h-8 w-8" />,
                                        delay: 0.6
                                    },
                                    {
                                        step: "05",
                                        title: "RL Optimization",
                                        description: "Fine-tune using reinforcement learning techniques",
                                        icon: <Zap className="h-8 w-8" />,
                                        delay: 0.8
                                    }
                                ].map((step, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6, delay: step.delay }}
                                        viewport={{ once: true }}
                                        className="group flex flex-col items-center"
                                    >
                                        {/* Hexagon shape with gradient border */}
                                        <div className="relative mb-4">
                                            {/* Hexagon background glow */}
                                            <div className="absolute -inset-3 bg-gradient-to-r from-primary/20 to-primary/5 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                                            
                                            {/* Hexagon with icon */}
                                            <div className="relative h-24 w-24 flex items-center justify-center bg-card border border-primary/30 rounded-xl shadow-lg transform transition-transform duration-300 group-hover:scale-110 group-hover:border-primary/70 group-hover:shadow-primary/20">
                                                <div className="absolute -top-3 -right-3 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                                                    {step.step}
                                                </div>
                                                <div className="text-primary">
                                                    {step.icon}
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <h3 className="mb-2 text-center text-lg font-semibold">{step.title}</h3>
                                        <p className="text-center text-sm text-muted-foreground max-w-[180px]">{step.description}</p>
                                    </motion.div>
                                ))}
                            </div>
                            
                            {/* Interactive explanation */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 1 }}
                                viewport={{ once: true }}
                                className="mt-16 flex justify-center"
                            >
                                <Card className="max-w-2xl border border-primary/20 bg-card/50 backdrop-blur-sm">
                                    <CardHeader>
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                                                <Brain className="h-5 w-5 text-primary" />
                                            </div>
                                            <CardTitle>Why RLHF Matters</CardTitle>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-muted-foreground">
                                            Reinforcement Learning from Human Feedback (RLHF) bridges the gap between AI capabilities and human expectations. 
                                            By incorporating direct human evaluations into the training process, RLHF creates models that are not only powerful 
                                            but also aligned with human values, preferences, and ethical considerations.
                                        </p>
                                    </CardContent>
                                    <CardFooter className="flex justify-end">
                                        <Button variant="ghost" size="sm" className="gap-1">
                                            Learn more about our methodology <ChevronRight className="h-4 w-4" />
                                        </Button>
                                    </CardFooter>
                                </Card>
                            </motion.div>
                        </div>
                    </div>
                </section>
                
                {/* Integrations Section (replacing Pricing) */}
                <section id="integrations" className="py-20">
                    <div className="container mx-auto px-4 sm:px-6">
                        <div className="mb-12 text-center">
                            <Badge variant="outline" className="mb-4">Integrations</Badge>
                            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">Seamless Integration with Your Stack</h2>
                            <p className="mx-auto max-w-2xl text-muted-foreground">
                                Connect our RLHF platform with your existing tools and workflows
                            </p>
                        </div>
                        
                        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                            {[
                                {
                                    icon: <Code className="h-10 w-10 text-primary" />,
                                    title: "API Access",
                                    description: "Comprehensive REST API for programmatic access to all platform features"
                                },
                                {
                                    icon: <Terminal className="h-10 w-10 text-primary" />,
                                    title: "CLI Tools",
                                    description: "Command-line interface for batch operations and automation"
                                },
                                {
                                    icon: <Database className="h-10 w-10 text-primary" />,
                                    title: "Data Connectors",
                                    description: "Import and export data from various sources and formats"
                                },
                                {
                                    icon: <RefreshCw className="h-10 w-10 text-primary" />,
                                    title: "CI/CD Integration",
                                    description: "Automate model training and deployment in your pipelines"
                                }
                            ].map((integration, index) => (
                                <Card key={index} className="border bg-card">
                                    <CardHeader className="pb-2">
                                        <div className="mb-2">{integration.icon}</div>
                                        <CardTitle>{integration.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-sm text-muted-foreground">{integration.description}</p>
                                    </CardContent>
                                    <CardFooter className="pt-0">
                                        <Button variant="ghost" size="sm" className="gap-1 p-0 text-primary">
                                            Learn more <ChevronRight className="h-4 w-4" />
                                        </Button>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>
                        
                        <div className="mt-16 flex justify-center">
                            <Card className="border-0 bg-muted/50 max-w-3xl">
                                <CardContent className="p-6">
                                    <div className="flex flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left">
                                        <div>
                                            <h3 className="mb-2 text-xl font-semibold">Ready to integrate with your tools?</h3>
                                            <p className="text-muted-foreground">Our developer documentation provides everything you need to get started.</p>
                                        </div>
                                        <Button className="whitespace-nowrap">View Documentation</Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </section>
                
                {/* CTA Section */}
                <section className="bg-primary text-primary-foreground py-16">
                    <div className="container mx-auto px-4 sm:px-6">
                        <div className="flex flex-col items-center justify-between gap-8 text-center md:flex-row md:text-left">
                            <div>
                                <h2 className="mb-2 text-3xl font-bold">Ready to improve your AI models?</h2>
                                <p className="text-primary-foreground/80">Start fine-tuning with human feedback today.</p>
                            </div>
                            <div className="flex gap-4">
                                <Button asChild variant="secondary" size="lg">
                                    <Link href={route('register')}>
                                        Get Started
                                    </Link>
                                </Button>
                                <Button asChild variant="outline" size="lg" className="border-primary-foreground/20 bg-transparent text-primary-foreground hover:bg-primary-foreground/10">
                                    <a href="#features">
                                        Learn More
                                    </a>
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>
                
                {/* Footer */}
                <footer className="border-t py-12">
                    <div className="container mx-auto px-4 sm:px-6">
                        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
                                                          <div>
                                  <div className="flex items-center">
                                     <AppLogo />
                                  </div>
                                  <p className="mt-4 text-sm text-muted-foreground">
                                    Improving AI alignment through human feedback and reinforcement learning.
                                  </p>
                                <div className="mt-4 flex gap-4">
                                    <a href="#" className="text-muted-foreground hover:text-foreground">
                                        <Github className="h-5 w-5" />
                                    </a>
                                    {/* Add more social icons as needed */}
                                </div>
                            </div>
                            
                            <div>
                                <h3 className="mb-4 text-sm font-semibold">Product</h3>
                                <ul className="space-y-2 text-sm">
                                    <li><a href="#features" className="text-muted-foreground hover:text-foreground">Features</a></li>
                                    <li><a href="#integrations" className="text-muted-foreground hover:text-foreground">Integrations</a></li>
                                    <li><a href="#" className="text-muted-foreground hover:text-foreground">API</a></li>
                                    <li><a href="#" className="text-muted-foreground hover:text-foreground">Documentation</a></li>
                                </ul>
                            </div>
                            
                            <div>
                                <h3 className="mb-4 text-sm font-semibold">Company</h3>
                                <ul className="space-y-2 text-sm">
                                    <li><a href="#" className="text-muted-foreground hover:text-foreground">About</a></li>
                                    <li><a href="#" className="text-muted-foreground hover:text-foreground">Blog</a></li>
                                    <li><a href="#" className="text-muted-foreground hover:text-foreground">Careers</a></li>
                                    <li><a href="#" className="text-muted-foreground hover:text-foreground">Contact</a></li>
                                </ul>
                            </div>
                            
                            <div>
                                <h3 className="mb-4 text-sm font-semibold">Legal</h3>
                                <ul className="space-y-2 text-sm">
                                    <li><a href="#" className="text-muted-foreground hover:text-foreground">Privacy Policy</a></li>
                                    <li><a href="#" className="text-muted-foreground hover:text-foreground">Terms of Service</a></li>
                                    <li><a href="#" className="text-muted-foreground hover:text-foreground">Cookie Policy</a></li>
                                </ul>
                            </div>
                        </div>
                        
                        <Separator className="my-8" />
                        
                        <div className="flex flex-col items-center justify-between gap-4 text-center text-sm text-muted-foreground md:flex-row md:text-left">
                            <p>© {new Date().getFullYear()} RLHF Platform. All rights reserved.</p>
                            <div className="flex gap-4">
                                <a href="#" className="hover:text-foreground">Privacy</a>
                                <a href="#" className="hover:text-foreground">Terms</a>
                                <a href="#" className="hover:text-foreground">Contact</a>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}