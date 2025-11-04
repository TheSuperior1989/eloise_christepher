import Image from "next/image"

export function OurStory() {
  return (
    <section id="story" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Photo Grid with soft borders */}
        <div className="mb-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* First Photo */}
          <div className="relative w-full h-[400px] sm:h-[500px] rounded-lg overflow-hidden shadow-lg border-8 border-white/50">
            <Image
              src="/assets/eloise_christepher.jpg"
              alt="Eloise and Christepher"
              fill
              className="object-cover"
            />
          </div>

          {/* Second Photo */}
          <div className="relative w-full h-[400px] sm:h-[500px] rounded-lg overflow-hidden shadow-lg border-8 border-white/50">
            <Image
              src="/assets/beautiful_funny.jpg"
              alt="Eloise and Christepher - Beautiful Moment"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Story Content */}
        <div className="space-y-8 max-w-4xl mx-auto">
          <h2
            className="font-serif text-4xl sm:text-5xl text-foreground text-center mb-4"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            Our Story
          </h2>
          <div className="w-24 h-px bg-accent mx-auto mb-12" />

          <div className="prose prose-lg max-w-none font-serif text-muted-foreground leading-relaxed text-center space-y-6">
            <p className="text-balance">
              It all started in Grade 10, in a computer class where two very different people's paths crossed. Eloise, the shy, introverted new girl, sat quietly in the front, trying to figure out where she fit in. And then there was Christepher: the class clown, towering over everyone, always cracking jokes, and somehow friends with everyone.
            </p>

            <p className="text-balance">
              At first, Eloise thought he was just another funny guy with a one-of-a-kind nose and even bigger eyes. But over time, something about his carefree attitude and sense of humor drew her in, despite her best efforts to play hard to get. Christepher, on the other hand, couldn't take his eyes off her. There was something about the way she smiled shyly, the little things she did that made her stand out. He was hooked, even if he had no idea how to approach her.
            </p>

            <p className="text-balance">
              The moment they really clicked was after Christepher had an accident while riding his bike, trying to avoid hitting a dog running across the road. He was out of school for two weeks, and Eloise, the new girl secretly crushing on him, couldn't just ask anyone about him. So, she got his number through a friend of a friend. They started talking casually, and when Christepher finally came back to school, Eloise saw him on the assembly block after opening. She rushed over and hugged him, only to quickly realize that it was their first hug and it was super awkward. Christepher knew then that Eloise liked him, and the whole double period that followed was torture for her as she blushed the entire time because he kept teasing her about the awkward hug. She later started teasing him, saying it was the day he "fell" for her.
            </p>

            <p className="text-balance">
              Then came the school carnival. Eloise, who didn't have a lot of money to spend on rides, was feeling a bit down about it. But Christepher, without skipping a beat, used every last bit of his cash, along with his cousins, to make sure she could enjoy every single ride and so he could have more time with her.
            </p>

            <p className="text-balance">
              As time unfolded, Eloise couldn't help but open up to him about her struggles and baggage. And Christepher, being the comforting and caring guy he is, looked at her and said, "Don't worry, we'll go through everything together. I love you, either way." That was when Eloise realized she was falling head over heels for him.
            </p>

            <p className="text-balance">
              It was never just about the big gestures for them. It was about the quiet moments, the shared laughter and tears, and the way Christepher made her feel safe and loved. But speaking of big gestures… the first proposal? Oh, that was anything but ordinary.
            </p>

            <p className="text-balance">
              On their 6th anniversary, Christepher decided to go all out with a scavenger hunt, but with a hilarious twist. He asked his mom to scatter Eloise's favorite treats around, each with a pun so sweet (and cheesy) that Eloise couldn't help but laugh: Super M – "You're my supermodel," Salami – "You're the only meat I want," Astros – "You're my whole galaxy," Bar One – "You are my num-Bar one," and many more. The funniest part? When Eloise and Christepher returned from their walk, his mom had forgotten where she hid the treats, so everyone ended up hunting together, secretly.
            </p>

            <p className="text-balance">
              As Eloise picked up each snack, Christepher led her through the holiday home and out to the boma where a fire crackled. With her hands full, she turned to Christepher for help, and that's when she found him on one knee.
            </p>

            <p className="text-balance">
              Her first words? "What are you doing, get up!" She thought he was joking, until she saw the ring. And just when she thought things couldn't get any more magical, a zebra (her favorite animal) that they had petted earlier came back with its female and baby following close behind. It was the perfect moment, something right out of a romantic comedy.
            </p>

            <p className="text-balance">
              But this love story had one more surprise. Life happened, and things changed. On another unforgettable day, years later, they found themselves in Cape Town, enjoying a beautiful sunset at Sea Point. And just as they were soaking in the view, they both turned to each other and, in perfect unison, said the exact same thing: "Will you marry me?"
            </p>

            <p className="text-balance">
              From that moment in high school to now, it's been a journey of ups and downs, laughter, adventure, and love. We've grown together, supporting each other through every challenge, and building a relationship that feels like a safe place. One we wouldn't trade for the world.
            </p>

            <p className="text-balance">
              So, whether it's a scavenger hunt or a sunset proposal, one thing is for sure: when you find your person, it's not just a love story, it's your own romantic movie, filled with laughs, surprises, and a whole lot of heart, with memories that will last forever.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
