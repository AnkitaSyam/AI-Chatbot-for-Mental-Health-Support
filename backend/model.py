from transformers import BlenderbotTokenizer, BlenderbotForConditionalGeneration

tokenizer = BlenderbotTokenizer.from_pretrained("facebook/blenderbot-3B")
model = BlenderbotForConditionalGeneration.from_pretrained("facebook/blenderbot-3B")

def get_response(user_input):
    inputs = tokenizer(user_input, return_tensors="pt")
    reply_ids = model.generate(**inputs)
    return tokenizer.decode(reply_ids[0], skip_special_tokens=True)
